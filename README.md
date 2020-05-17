# Introduction 
If you need a login to secure your endpoints, you have come to the right github repository. 
This thing can secure based on JWT tokens and store roles in a database. 
# Steps to run 
 ```docker-compose up -d```
 
Initialize the database with : ``` docker exec spiderweb_auth_1 /bin/sh -c "node InitDB.js"```

```/login``` provides the access_token, which then can be used in ```/verify ``` or tested with /secure. Roles are also saved in the key. 

The entire index.js is a demo of how to integrate directly using middleware on this.secure. This middleware can be switched out if the Authserver is accessed over http. 

Please look at the tests. hopefully they are all running. ``` mocha test ```

if you want to run this locally, change the config/config.json to use localhost as the server instead of postgres

create a user by doing  ``` docker exec spiderweb_auth_1 /bin/sh -c "node AddUser.js user password user,admin" ``` user,admin are a list of comma separated roles, default is user

# example commands: 
set user: 
``` docker exec spiderweb_auth_1 /bin/sh -c "node AddUser.js user password user,admin" ```
login with user : 
``` curl --location --request POST '0.0.0.0:3030/login' \
--header 'Content-Type: application/json' \
--data-raw '{"username":"user", "password": "password"}'```
verify user with access_token you received : 
```
curl --location --request GET 'localhost:3030/verify' \
--header 'Authorization: Bearer ACCESS_TOKEN_GOES_HERE' \
--header 'Content-Type: application/json' \

--data-raw '{"username":"username", "password": "password"}```
get a 401 if unauthorized or 200 if authorized along with username and roles. 

(optional) access 0.0.0.0:3030/secure with the Authorization Bearer token to see if accessing a secure endpoint works. 


