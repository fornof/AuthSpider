# Introduction 
If you need a login to secure your endpoints, you have come to the right github repository. 
This thing can secure based on JWT tokens and store roles in a database. 
# Steps to install
run docker-compose up -d 
checkout config/config.json and make sure the postgresql connection string is correct
1. ``` node InitDB.js ``` there is one table of users for base functionality. 
2. ``` node AddUser user password123 user``` add a user to the database 
3. ``` node index.js ``` this runs the auth server. ```/login``` provides the access_token, which then can be used in ```/verify or``` tested with /secure. Roles are also saved in the key. 
4. The entire index.js is a demo of how to integrate directly using middleware on this.secure. This middleware can be switched out if the Authserver is accessed over http. 

5. Please look at the tests. hopefully they are all running. ``` mocha test ```

6. if you want to run this locally, change the config/config.json to use localhost as the server instead of postgres

