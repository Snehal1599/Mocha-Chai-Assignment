const express = require('express');
const router = express.Router();
const Response = require("./response");
const bodyparser = require('body-parser');
router.use(bodyparser.json());
const mysqlConnection = require("./database");

var response = new Response();

//Get all employees
router.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee',(err, rows, fields)=>{
        let returnValue = "";
        if(err){
            returnValue = response.failure("Error in getting all Users");
            res.send(returnValue);
            //console.log(err);
        }else
            returnValue = response.success(rows);
            res.send(returnValue);
        })
});

//Get an employee
router.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee WHERE ID = ?',[req.params.id],(err, rows, fields)=>{
        let returnValue = "";
        if(err){
            returnValue = response.failure("Error in getting User");
            res.send(returnValue);
            //console.log(err);
        }else
            returnValue = response.success(rows);
            res.send(returnValue);
        })
});

//Delete an employees
router.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE ID = ?', [req.params.id], (err, rows, fields) => {
        let returnValue = "";
        if (err){
            returnValue = response.failure("Error in deleting User");
            res.send(returnValue);
            //res.send('True');
        }else{
            returnValue = response.success('True');
            res.send(returnValue);
            //console.log(err);  
        }
    })
});

//Insert an employees
router.post('/addemployee', (req, res) => {
    let emp = req.body;
    var sql = "SET @ID = ?;SET @FIRSTNAME = ?;SET @LASTNAME = ?;SET @ADDRESS = ?; SET @ORGNAME = ?; SET @SALARY = ?; \
    CALL EmployeeAddOrEdit(@ID,@FIRSTNAME,@LASTNAME,@ADDRESS,@ORGNAME,@SALARY);";
    mysqlConnection.query(sql, [emp.ID, emp.FIRSTNAME, emp.LASTNAME, emp.ADDRESS,emp.ORGNAME, emp.SALARY], (err, rows, fields) => {
        let returnValue = "";
        if (err){
            returnValue = response.failure("Error in inserting User");
            res.send(returnValue);
            //console.log(err);
        }else{
            rows.forEach(element => {
                if(element.constructor == Array){
                    returnValue = response.success('Inserted employee id : '+element[0].ID);
                    res.send(returnValue);
                    res.end();
                }
            });
        }
    })
});

//Update an employees
router.put('/updateemployee', (req, res) => {
    let emp = req.body;
    var sql = "SET @ID = ?;SET @FIRSTNAME = ?;SET @LASTNAME = ?;SET @ADDRESS = ?; SET @ORGNAME = ?; SET @SALARY = ?; \
    CALL EmployeeAddOrEdit(@ID,@FIRSTNAME,@LASTNAME,@ADDRESS,@ORGNAME,@SALARY);";
    mysqlConnection.query(sql, [emp.ID, emp.FIRSTNAME, emp.LASTNAME, emp.ADDRESS,emp.ORGNAME, emp.SALARY], (err, rows, fields) => {
        let returnValue = "";
        if (err){
            returnValue = response.failure("Error in updating User");
            res.send(returnValue);
            //console.log(err);
        }else{
            returnValue = response.success(rows);
            res.send(returnValue);
            //res.send('Updated successfully');
        }
    })
});

module.exports = router;