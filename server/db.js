var mysql = require('mysql');
const db = require('./config/db')

exports.tryConnect = function() {
    con = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port: db.port
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
}