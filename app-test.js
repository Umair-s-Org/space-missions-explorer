let mongoose = require("mongoose");
let server = require("./app");
let chai = require("chai");
let chaiHttp = require("chai-http");


// Assertion 
chai.should();
chai.use(chaiHttp); 

describe('Space Missions API Suite', () => {

    describe('Fetching Mission Details', () => {
        it('it should fetch a mission named Apollo 11', (done) => {
            let payload = {
                id: 1
            }
          chai.request(server)
              .post('/mission')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(1);
                    res.body.should.have.property('name').eql('Apollo 11');
                done();
              });
        });

        it('it should fetch a mission named Voyager 1', (done) => {
            let payload = {
                id: 2
            }
          chai.request(server)
              .post('/mission')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(2);
                    res.body.should.have.property('name').eql('Voyager 1');
                done();
              });
        });

        it('it should fetch a mission named Mars Rover Curiosity', (done) => {
            let payload = {
                id: 3
            }
          chai.request(server)
              .post('/mission')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(3);
                    res.body.should.have.property('name').eql('Mars Rover Curiosity');
                done();
              });
        });
        it('it should fetch a mission named Hubble Space Telescope', (done) => {
            let payload = {
                id: 4
            }
          chai.request(server)
              .post('/mission')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(4);
                    res.body.should.have.property('name').eql('Hubble Space Telescope');
                done();
              });
        });

        it('it should fetch a mission named Cassini-Huygens', (done) => {
            let payload = {
                id: 5
            }
          chai.request(server)
              .post('/mission')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(5);
                    res.body.should.have.property('name').eql('Cassini-Huygens');
                done();
              });
        });

        it('it should fetch a mission named New Horizons', (done) => {
            let payload = {
                id: 6
            }
          chai.request(server)
              .post('/mission')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(6);
                    res.body.should.have.property('name').eql('New Horizons');
                done();
              });
        });

        it('it should fetch a mission named James Webb Space Telescope', (done) => {
            let payload = {
                id: 7
            }
          chai.request(server)
              .post('/mission')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(7);
                    res.body.should.have.property('name').eql('James Webb Space Telescope');
                done();
              });
        });

        it('it should fetch a mission named International Space Station', (done) => {
            let payload = {
                id: 8
            }
          chai.request(server)
              .post('/mission')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(8);
                    res.body.should.have.property('name').eql('International Space Station');
                done();
              });
        });

    });        
});

//Use below test case to achieve coverage
describe('Testing Other Endpoints', () => {

    describe('it should fetch OS Details', () => {
        it('it should fetch OS details', (done) => {
          chai.request(server)
              .get('/os')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });

    describe('it should fetch Live Status', () => {
        it('it checks Liveness endpoint', (done) => {
          chai.request(server)
              .get('/live')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('live');
                done();
              });
        });
    });

    describe('it should fetch Ready Status', () => {
        it('it checks Readiness endpoint', (done) => {
          chai.request(server)
              .get('/ready')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('ready');
                done();
              });
        });
    });

});