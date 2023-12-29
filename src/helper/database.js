const mysql = require('mysql');
const configs = require("../config/environment");

const con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword",
    database: "mydb"
});

const connection = con.connect()

let user = Users.findById(10) 