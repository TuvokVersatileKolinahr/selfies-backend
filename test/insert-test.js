var request = require('supertest'),
    should = require('should'),
    express = require('express');
var app = require('../app.js');
var selfies = require('./helpers/selfies.js').list;

var api_uri = '/api/selfies'
// to enable debug logging start test with: env DEBUG_TEST=true mocha
var debug = process.env.DEBUG_TEST;

describe('Array insert test', function(){
  it('does nothing so it shouldnt bother you', function(done){
    if (debug)
      console.log("[DISABLED] This test is disabled. Use for inserting a basic dataset with 7 tap-points.");
    done();
  });

  selfies.forEach(function(element, index, array) {
    it('inserts all selfies in this selfies variable', function(done){
      request(app)
      .post(api_uri)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({'about': element.about, 'name': element.name, 'picture': element.picture})
      .expect(200)
      .end(function(err, res) {
        console.log("res.body", res.body);
        should.not.exist(err);
        res.body.data.name.should.eql(element.name);
        res.body.data.about.should.eql(element.about);
        res.body.data.picture.should.eql(element.picture);
        console.log("[PASSED] Inserted id(%s), result of POST:\n %s", res.body.data._id, JSON.stringify(res.body.data, null, "  "));
        done();
      });
    });
  });
});