let jose = require('jose')
let config = require('../config/config.json')
const {
    JWK,   // JSON Web Encryption (JWE) 
    JWT,   // JSON Web Token (JWT)
    errors // errors utilized by jose
  } = jose
class Auth{
    constructor({db}){
        this.db = db 
        this.config = config
        // if this private key generates everytime, you will lose your current sessions on restart
        // put a private key in config to sustain sessions on restart. 
        this.config.privateKey = this.config.privateKey|| JWK.generateSync('RSA') 
        // this.config.expireTime = '1 hour'
        // this.config.secret = 'ILikeYou'
    }

    verify(jwt){
        // console.log('jwt is', jwt)
        return JWT.verify(jwt, this.config.privateKey)
    }
    sign(role, username, expires = '1 hour'){
        return JWT.sign(
            { 'role': role, 'username': username },
            this.config.privateKey,
            {
              algorithm: 'RS256',
              audience: 'urn:geometrifigure:client_id',
              expiresIn: expires,
              header: {
                typ: 'JWT'
              },
              issuer: 'https://geometricfigure.com'
            }   
          ) 
      
    }
    async login(username, password){
        //check database and provide signed token if exists in database and is correct
          let resultLogin=  await this.db.user.login(username, password).catch(error=>
             {
                console.log( error)
                throw error
                })
               
          let accessToken = this.sign(resultLogin.roles,resultLogin.username, this.config.expireTime)
          return {access_token : accessToken}
    }
}
module.exports = Auth