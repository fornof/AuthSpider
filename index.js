const Koa = require('koa');
const KRouter = require('koa-router')
const Auth = require('./src/Auth')
const bodyParser = require('koa-bodyparser');
const Database = require('./src/Database')
const config = require('./config/config.json')
class Spider{
    constructor(){

        this.router = new KRouter()
        this.secure = new KRouter()
        this.db = new Database()
        this.auth = new Auth({db:this.db})
        this.app = new Koa()
        
        this.port = process.env.PORT||config.port|| 3000
        this.setupKoa()
        this.setupSecure()
    }
    connect(){
        console.log('listening on port '+this.port)
        this.app.listen(this.port);
    }
    // this is setup 
    setupKoa(){
        this.router.get('/health', (ctx, next) => {
            ctx.status = 200
            ctx.body = {code: "success"}
        });
        this.router.get('/verify', this.verify.bind(this))
        this.router.post('/login', this.login.bind(this));
        
          
          this.app
          .use(bodyParser())
            .use(this.router.routes())
            .use(this.router.allowedMethods());
    }

    setupSecure(){
        // secure uses middleware to check auth and provides check against roles too
        this.secure.use(async (ctx, next) => {
            let data = ctx.request.headers
            if(!data.authorization){
                ctx.status = 401
                ctx.body = {code: "Auth:Unauthorized"}
                return
            }
            let result
            try{
            result = this.auth.verify(data.authorization.split(" ")[1])
            ctx.roles = result.role
            }catch(error){
                console.log(error.message)
                ctx.status = 401
                ctx.body = {code: "Auth:Unauthorized"}
                return
            }
            ctx.status = 200
            await next()
        })
        this.secure.get('/secure', this.secured.bind(this));
        
          this.app
            .use(this.secure.routes())
            .use(this.secure.allowedMethods());
    }
    secured(ctx){
        ctx.status = 200
        ctx.body = "You got in to secured spot with roles: " + ctx.roles
    }
    verify(ctx){
            let data = ctx.request.headers
            if(!data.authorization){
                ctx.status = 401
                ctx.body = {code: "Auth:Unauthorized"}
                return
            }
            let result
            try{
            result = this.auth.verify(data.authorization.split(" ")[1])
            }catch(error){
                //console.log(error.message)
                ctx.status = 401
                ctx.body = {code: "Auth:Unauthorized"}
                return
            }
            ctx.status = 200
            ctx.body = {username:result.username, roles:result.role}
    }
    async login(ctx){
        let data = ctx.request.body
    
        let result = await this.auth.login(data.username,data.password)
       
         .catch(error=>{
            ctx.status = 401
            ctx.body = {code: "Auth:InvalidCredentials"}
            
        })
        console.log('result',result)
        if(result){
            ctx.status = 200
            ctx.body = result
            return
        }
        ctx.body = {code: "InvalidCredentials"}
    }
}
module.exports = Spider 
if(require.main === module){
    spider  = new Spider()
    spider.connect()
}