process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');


chai.use(chaiHttp);

//Our parent block
describe('SMS', () => {

    /*
     * Test the /POST sms/toAll route
     */
    describe('SMS to all users', () => {
        it('it should not send sms without a message field', (done) => {
            let sms = {};
            chai.request(app)
                .post('/sms/group-sms')
                .send(sms)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql("message is required");
                    done();
                });
        });

    });

    /*
     * Test the /POST sms/ route
     */
    describe('SMS to a specific user or users', () => {
        it('it should not send sms without an ids field', (done) => {
            let sms = {
                message: "Dummy message"
            };

            chai.request(app)
                .post('/sms/individual-sms')
                .send(sms)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('message and ids are required');
                    done()
                });
        });
    });


});

