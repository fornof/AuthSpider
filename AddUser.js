
const Spider = require('./index.js')
        async function main(){
        let input  = process.argv.slice(2)
        console.log(input)
        if(input.length == 0 )
        {
            console.log("HELP: Add user like this: node AddUser.js <username> <password> [roles]")
            return

        }

        const spider = new Spider()
        let result=  await spider.db.user.add(input[0], input[1], input[2]||'user')
        // let resultLogin=  await spider.db.user.login('username', 'password')
    }
    main()
 