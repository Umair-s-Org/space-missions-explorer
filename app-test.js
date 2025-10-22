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
                    res.body.should.have.property('os');
                    res.body.should.have.property('env');
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

    describe('it should fetch Main HTML Page', () => {
        it('it should serve the main HTML page', (done) => {
          chai.request(server)
              .get('/')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.header('content-type', /text\/html/);
                done();
              });
        });
    });

});

// Add tests for error conditions to improve coverage
describe('Testing Error Conditions', () => {

    describe('Mission API Error Handling', () => {
        it('it should handle invalid mission ID gracefully', (done) => {
            let payload = {
                id: 999  // Invalid mission ID
            }
          chai.request(server)
              .post('/mission')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    // Should return null for non-existent mission or empty object
                done();
              });
        });

        it('it should handle missing ID in request body', (done) => {
            let payload = {
                name: "test"  // Missing id field but has other data
            }
          chai.request(server)
              .post('/mission')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });

        it('it should handle string ID in request body', (done) => {
            let payload = {
                id: "invalid"  // String instead of number
            }
          chai.request(server)
              .post('/mission')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });

        it('it should handle empty request body', (done) => {
          chai.request(server)
              .post('/mission')
              .send({})
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });

        it('it should handle null ID in request body', (done) => {
            let payload = {
                id: null
            }
          chai.request(server)
              .post('/mission')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });

    describe('HTTP Methods Coverage', () => {
        it('it should handle GET request to mission endpoint (404)', (done) => {
          chai.request(server)
              .get('/mission')
              .end((err, res) => {
                    // This endpoint doesn't exist for GET, should return 404
                    res.should.have.status(404);
                done();
              });
        });

        it('it should handle PUT request to mission endpoint (404)', (done) => {
          chai.request(server)
              .put('/mission')
              .send({id: 1})
              .end((err, res) => {
                    // PUT not implemented, should return 404
                    res.should.have.status(404);
                done();
              });
        });

        it('it should handle DELETE request to mission endpoint (404)', (done) => {
          chai.request(server)
              .delete('/mission')
              .end((err, res) => {
                    // DELETE not implemented, should return 404
                    res.should.have.status(404);
                done();
              });
        });
    });

    describe('Static File Serving', () => {
        it('it should serve static files from root directory', (done) => {
          chai.request(server)
              .get('/package.json')  // This should be served as static file
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });

});