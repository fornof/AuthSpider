
const Spider = require('./index.js')
let addUser = `CREATE TABLE public.users
(
    password character varying(300) COLLATE pg_catalog."default",
    userid integer NOT NULL DEFAULT nextval('users_userid_seq'::regclass),
    username character varying COLLATE pg_catalog."default",
    roles character varying(30)[] COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (userid),
    CONSTRAINT user_unique UNIQUE (username)
        INCLUDE(username)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;`

async function main(){
    const spider = new Spider()
    let result=  await spider.db.query(addUser)
    // let resultLogin=  await spider.db.user.login('username', 'password')
}
main()

