const mysql = require('mysql2/promise');

module.exports = async function(){
    return await mysql.createConnection({
        host : 'localhost' ,
        port : '3306' ,
        user : 'root' ,
        password : '',
        database : 'LogCon'
    });
}