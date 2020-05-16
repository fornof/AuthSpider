var assert = require('assert');
const Spider = require('../index.js')
describe('Array', function() {
  describe('login', function() {
    it('add a user to the database', async  function() {
        const spider = new Spider()
        let resultDelete=  await spider.db.user.delete('username')
        let result=  await spider.db.user.add('username', 'password', 'user,admin')
        let resultLogin=  await spider.db.user.login('username', 'password')
         
        // let resultUpdate=  await spider.db.user.update('username', {password: 'password', roles:'role'})
        
        console.log(resultLogin)
        assert(result != undefined)
        assert(resultLogin.rows[0].username == 'username')
        await spider.db.user.delete('username')
    });

  });
});