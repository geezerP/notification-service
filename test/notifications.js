process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

//Our parent block
describe('Notifications', () => {

    /*
     * Test the /POST notifications/toAll route
     */
    describe('Notification to All users', () => {
        it('it should not send a notification without a title field', (done) => {
            let notification = {
                message: "Test Notification body",
                data: {}
            };
            chai.request(app)
                .post('/notifications/send-notifications-to-all')
                .send(notification)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql("title, message, and data are required");
                    done();
                });
        });

    });

    /*
     * Test the /POST notifications/ route
     */
    describe('Notification to a specific user or users', () => {
        it('it should not send a notification without an ids field', (done) => {
            let notifcation = {
                title: "Dummy title",
                message: "Dummy message",
                data: {}
            };
            chai.request(app)
                .post('/notifications/send-individual-notification')
                .send(notifcation)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ids, title, message, and data are required');
                    done()
                });
        });
    });


    /*
     * Test the /POST notifications/toGroup route
     */
    describe('Notification to a specific group', () => {
        it('it should not send a notification without an topic field', (done) => {
            let notifcation = {
                title: "Dummy title",
                message: "Dummy message",
                data: {}
            };
            chai.request(app)
                .post('/notifications/send-to-group')
                .send(notifcation)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('topic, title, message, and data are required');
                    done()
                });
        });
    });


});

