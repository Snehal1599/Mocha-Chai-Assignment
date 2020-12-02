var chai = require('chai');
var expect  = require('chai').expect;
const chaiHttp = require('chai-http');
var request = require('request');
//const app = require('../src/app');
var baseURL = 'http://localhost:3000/';

chai.use(chaiHttp);

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
        request(baseURL+"employees/3" , function(error, response, body) {
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

    it('Delete a record', function(done){
        chai
        .request(baseURL)
        .delete('employees/17')
        .end((err,res) =>{
            expect(res).to.have.status(200);
            done();
        });
    });

    it('Update a record', function(done){
        chai
        .request(baseURL)
        .put('updateemployee')
        .send({"ID":15,"FIRSTNAME":"Hrushi","LASTNAME":"Ingale","ADDRESS":"Sinnar","ORGNAME":"Infosys","SALARY":30000})
        .end((err,res) =>{
            expect(res).to.have.status(200);
            done();
        });
    })
});
