const mysql=require("mysql")
const util=require("util")

const pool=mysql.createPool({
    host:"remotemysql.com",
    user:"3tTwQnZmxy",
    password:"N0ZaBhCo2t",
    database:"3tTwQnZmxy"
})

pool.query=util.promisify(pool.query)

module.exports=pool