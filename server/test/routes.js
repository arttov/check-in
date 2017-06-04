let should = require('should');
let assert = require('assert');
let request = require('supertest');
let mongoose = require('mongoose');
let config = require('../config/config.json');

describe('CRUD API TEST', function() {

  //set default data for test
  let data = [];
  let coordinate = [43.22222, 48.22222];
  let url = config.url;

  before(function(done) {
    // In our tests we use the test db
    mongoose.connect(config.db.test_host);
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

    it('should correctly update an existing user', function(done){
      let body = {
        name: 'TEST USER',
        coordinate: coordinate
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
          res.body.coordinate[1].should.equal(48.22222);
          done();
        });
    });

    it('should get near by user in radius 1 km', function(done) {

      let getUserUrl = '/'+coordinate[0]+'/'+coordinate[1];
      request(url)
        .get(getUserUrl)
        .end(function(err, res) {
          if (err) throw err;

          // this is should.js syntax, very clear
          res.should.have.property('status', 200);
          assert.notEqual(res.body.length, 0);
          done();
        });
    });

    it('should return status 200 after DELETING a user', function(done) {
      request(url)
        .del('/'+data.id)
        .end(function(err, res) {
          if (err) throw err;

          res.should.have.property('status', 200);
          done();
        });
    });

  });
});
