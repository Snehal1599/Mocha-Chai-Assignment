var chai = require('chai');
var expect  = require('chai').expect;
const chaiHttp = require('chai-http');
var request = require('request');
const mysqlConnection = require("../src/database");

var baseURL = 'http://localhost:3000/';
var count = 0;
var userID = 0;

chai.use(chaiHttp);

describe('hooks steps', () =>{

    before(function () {
        mysqlConnection.query("INSERT INTO Employee (FIRSTNAME, LASTNAME, ADDRESS, ORGNAME, SALARY) VALUES ('Aditya', 'Lokhande', 'Kopargaon', 'TCS', 30000)", function(err, result){
            if(err) throw err;
            userID = result.insertId;
        });
    });
    
    beforeEach(function () {
        console.log("Currently checking for: " + count);
    });
   
    describe('API test', () =>{

        it('Get All User', function(done) {
            request(baseURL+"employees" , function(error, response, body) {
                console.log(body);
                let bodyObject = JSON.parse(body);
                expect(bodyObject.success).to.equal(true);
                expect(bodyObject.data).to.be.an('array');
                done();
            });
        });
        
        it('Get An User', function(done) {
            request(baseURL+"employees/" + userID , function(error, response, body) {
                console.log(body);
                let bodyObject = JSON.parse(body);
                expect(bodyObject.success).to.equal(true);
                expect(bodyObject.data).to.be.an('array');
                done();
            });
        });
         
        it('Insert a record', function(done){
            chai
            .request(baseURL)
            .post('addemployee')
            .send({"ID":0,"FIRSTNAME":"Hrushi","LASTNAME":"Ingale","ADDRESS":"Sinnar","ORGNAME":"Cognizant","SALARY":25000})
            .end((err,res) =>{
                expect(res).to.have.status(200);
                done();
            });
        });
    
        it('Update a record', function(done){
            chai
            .request(baseURL)
            .put('updateemployee')
            .send({"ID":userID,"FIRSTNAME":"Hrushi","LASTNAME":"Ingale","ADDRESS":"Sinnar","ORGNAME":"Infosys","SALARY":30000})
            .end((err,res) =>{
                expect(res).to.have.status(200);
                done();
            });
        })

        it('Delete a record', function(done){
            chai
            .request(baseURL)
            .delete('employees/'+ userID)
            .end((err,res) =>{
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    afterEach(function () {
      
        console.log("Done with: " + count);
        ++count;
    });
});



