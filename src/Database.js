const { Pool } = require('pg')
const crypto = require('crypto')
const config = require('../config/config.json')
class Database{
    constructor(){
        this.config = config
  
        this.user = { add: this.addUser.bind(this),
                     delete: this.deleteUser.bind(this),
                     login: this.login.bind(this)
                    }
    }

    hash(variable){
        
        return crypto.createHmac('sha256', this.config.secret)
                           .update(variable)
                           .digest('hex');
    
    }
async login(username, password){
        // check if user exists 
        // throw error if exists
        // add user' 
        if(!password || password === ''){
            throw Error("AUTH:NoPasswordPresented")
        }
        password = this.hash(password)
       
        let result = await this.query("SELECT * from users where password=$1 and username=$2",[password, username])
       
        if (!result || result.rows.length == 0  ){
            throw Error("AUTH:Unauthorized")
        }
        return result.rows[0]
    }
async addUser(username, password, roles = 'user'){
    // check if user exists 
    // throw error if exists
    // add user' 
    if(!password || password === ''){
        throw Error("no password given")
    }
    password = this.hash(password)
    return this.query("INSERT INTO users (username, password, roles) VALUES($1,$2,$3)",[username, password, `{${roles}}`])
}
async deleteUser(username){
    // check if user exists 
    // throw error if exists
    // add user' 
    return this.query("DELETE from users where username = $1",[username])
}
async query(msg,values){
    let pool = new Pool({
        connectionString:  this.config.connectionString
    })
    let result = await pool.query(msg,values)
    pool.end()
    return result 
}
}
module.exports = Database