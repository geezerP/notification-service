process.env.NODE_ENV = 'test';

const User = require('../api/models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Refresh Token', () => {

    /*
     * Test the /PUT refreshToken route
     */
    describe('Update user token', () => {
        it('it should not update the user without a token field', (done) => {
            let data = {
                id: "73",
            };
            chai.request(app)
                .put('/refreshToken')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql("id and token are required");
                    done();
                });
        });

    });


});

