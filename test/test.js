//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
var expect=chai.expect;

let should = chai.should();

chai.use(chaiHttp);

describe('checklogin',()=>{
	it('to check login get method',(done)=>{
		chai.request('http://localhost:3000').get('/test').send({role: "123"}).end((err,res)=>{
			expect(res.status).to.equal(200);
            //expect(res.data).to.be.an('object');
            done();
		})
	})
})