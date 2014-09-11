var request = require('supertest'),
    should = require('should'),
    express = require('express');
var dimsum = require('dimsum').configure({ flavor: 'jabberwocky' });
var app = require('../app.js');

var api_uri = 'selfies'
var author = dimsum(1);
var about = dimsum.sentence(2);
var base64_image_string = '';
var d = '';

describe'POST', function(){
  it('responds with a json success message', function(done){
    request(app)
    .post(api_uri)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({'about': about, 'author': author, pic: base64_image_string})
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      console.log("Inserted id(%s) for later deletion, result of POST:\n %s", res.body.data._id, JSON.stringify(res.body.data, null, "  "));
      d = res.body.data._id;
      done();
    });
  });
});

describe('GET', function(){
  it('responds with a list of selfie items in JSON', function(done){
    request(app)
    .get(api_uri)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      console.log("Found %s items.", res.body.length);
      done();
    });
  });
});

describe('GET', function(){
  it('responds with a single selfie item in JSON based on the author', function(done){
    request(app)
    .get(api_uri + '/' + author)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.result.should.have.property('_id', d);
      console.log("Get returned the inserted selfie:\n %s", JSON.stringify(res.body.result, null, "  "));
      done();
    });
  });
});

describe('DELETE', function() {
  it('deletes a selfie with the id ' + d, function(done) {
    request(app)
    .del(api_uri + '/' + d)
    .set('Accept', 'application/json')
    .expect(200, done)
  })
});