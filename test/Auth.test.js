var assert = require('assert');
const Spider = require('../index.js')
describe('Array', function() {
  describe('login', function() {
    it('given a login username and password it should return a JWT token with role and validate', async  function() {
        const spider = new Spider()
       // let resultDelete=  await spider.db.user.delete('username')
        //let resultAdd=  await spider.db.user.add('username', 'password', 'user,admin')
        let ctx = {request:{body:{username:'username', password:'password'}}}
        await spider.login(ctx)
       // assert(ctx.body.code == "InvalidCredentials")
       console.log(ctx.body.access_token)
       let result = spider.auth.verify(ctx.body.access_token)
       assert(ctx.body.access_token !== undefined)
       console.log(result, 'result!')
       assert(result != undefined)
    });
    it('it should throw error if expired', function() {
      const spider = new Spider()
      let token = spider.auth.sign('foobee', '0 seconds')
      assert(token !== undefined)
      assert.throws(()=>{spider.auth.verify(token)})
     // assert(ctx.body.code == "InvalidCredentials")
    
  });
  it('secure endpoint', async function() {
    const spider = new Spider()
    await spider.secure(ctx)
    assert(ctx.status === 401)
    // docker - dockecompose.
   // assert(ctx.body.code == "InvalidCredentials")

});

//   it.only('promise me you will think async', async function() {
//   function foo(in1 , in2){
//       console.log('bar')
//       return new Promise((resolve,reject)=>{
//         if(in1=== 'SUCCESS'){
//           resolve('SUCCESSOUTPUT')
//         }
//         else{
//           reject('REJECTED')
//         }
//       })
//     }  
//     foo().then(data => { console.log(data, "data!!!") }).catch(error=>{console.log(error)})
//     //x process waits a looong time. and we want that to run in the background promises.then would
//     // execute code when x is done while not tying up the main thread. 

//     // must wait for x process to finish before completing y process. 

    


   
  
// });
  });
});