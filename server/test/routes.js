let should = require('should');
let assert = require('assert');
let request = require('supertest');
let config = require('../config/config.json');
let DB = require('../config/db.js');
let mongoose = require('mongoose');

describe('CRUD API TEST', function() {

  //set default data for test
  let data = [];
  let locationInRadius = [43.22222, 48.22223];
  let locationOutRadius = [49.865463, 40.397408];
  let url = config.host;

  before(function(done) {
    // In our tests we use the test db
    DB.connect(DB.MODE_TEST);
    done();
  });

  describe('Create user', function() {
    it('should create user, and return status code 200', function(done) {

      let userData = {
        name: 'ARNOLD ARNOLD',
        coordinate: [43.2555, 48.6541] ,
        created: Date.now(),
        updated: Date.now()
      };

      request(url)
        .post('/')
        .set('Content-Type','application/json')
        .send(userData)
        .end(function(err, res) {
          if (err) throw err;

          //save created user id for next test
          data.id = res.body.id;
          res.should.have.property('status', 200);
          done();
        });
    });

    it('should create user more then 1km radius, and return status code 200', function(done) {

      let userData = {
        name: 'THOMAS THOMAS',
        coordinate: locationOutRadius ,
        created: Date.now(),
        updated: Date.now()
      };

      request(url)
        .post('/')
        .set('Content-Type','application/json')
        .send(userData)
        .end(function(err, res) {
          if (err) throw err;

          //save created user id for next test
          data.removeId = res.body.id;
          res.should.have.property('status', 200);
          done();
        });
    });


    it('should correctly update an existing user', function(done){
      let body = {
        name: 'TEST USER',
        coordinate: locationInRadius
      };

      request(url)
        .put('/' + data.id)
        .send(body)
        .end(function(err,res) {
          if (err) throw err;

          //update user id for next test
          data.id = res.body.id;

          // Should.js fluent syntax applied
          res.should.have.property('status', 200);
          res.body.should.have.property('_id');
          res.body.name.should.equal('TEST USER');
          res.body.coordinate[0].should.equal(43.22222);
          res.body.coordinate[1].should.equal(48.22223);
          done();
        });
    });

    it('should get near by user in radius 1 km', function(done) {

      let getUserUrl = '/'+locationInRadius[0]+'/'+locationInRadius[1];
      request(url)
        .get(getUserUrl)
        .end(function(err, res) {
          if (err) throw err;
          res.should.have.property('status', 200);
          assert.equal(res.body.length, 1);
          done();
        });
    });

    it('should return status 200 after DELETING a user', function(done) {

      request(url)
        .del('/'+data.id)
        .end(function(err, res) {
          if (err) throw err;

          res.should.have.property('status', 200);
        });

      request(url)
        .del('/'+data.removeId)
        .end(function(err, res) {
          if (err) throw err;

          res.should.have.property('status', 200);

        });

      done();
    });

  });
});

