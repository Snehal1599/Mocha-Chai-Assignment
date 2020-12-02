const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Snehal@06',
    database: 'employeedb',
    multipleStatements : true
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log("DB Connection Successful");
    else
        console.log("DB Connection Failed \n Error : " + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;

