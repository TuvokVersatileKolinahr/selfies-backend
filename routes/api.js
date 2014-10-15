var express  = require('express'),
    router   = express.Router(),
    Selfie   = require('../models/selfie-model').selfie,
    Response = require('../models/selfie-model').response,
    config   = require('../lib/configuration');

function _sendresult(error, result, res) {
  if (!error) {
    if (result === null)
      res.status(204).send();
    else 
      res.send({selfies: result});
  } else {
    console.log(error);
    res.status(500);
    res.send(error);
  }
}

router.get('/selfies', function(req, res) {
  Selfie.find({ isActive: true })
    .sort({'uploaded': -1})
    .limit(req.query.limit)
    .exec(function(err, result) {
      _sendresult(err, result, res)
  });
});

router.get('/responses', function(req, res) {
  Response.find({ isActive: true })
    .sort({'uploaded': -1})
    .limit(req.query.limit)
    .exec(function(err, result) {
      _sendresult(err, result, res)
  });
});

router.get('/selfies/:id', function(req, res) {
  Selfie.findOne({'_id': req.params.id})
  .exec(function(err, result) {
    //So there is a selfie with this id
    Response.find({responseTo: req.params.id}).
    exec(function(err, responses) {
      console.log("responses", responses);
      result.responses = responses;
      _sendresult(err, result, res);
    });
  })
});

router.delete('/selfies/:id', function(req, res) {
  Selfie.findById(req.params.id, function (err, selfie) {
    selfie.remove(function (err) {
      _sendresult(err, null)
    });
  });
});

router.post('/selfies', function(req, res) {
  var picture_url = config.get('selfies:base_uri') + config.get('selfies:image_dir');
  new Selfie({about: req.body.about, name: req.body.name, picture: picture_url + req.files.pic.name}).save(function(err, selfie) {
    _sendresult(err, result, res)
  });
});

router.post('/responses/:id', function(req, res) {
  var picture_url = config.get('selfies:base_uri') + config.get('selfies:image_dir');
  new Response({about: req.body.about, name: req.body.name, picture: picture_url + req.files.pic.name, responseTo: req.params.id}).save(function(err, selfie) {
    _sendresult(err, result, res)
  });
});

router.put('/selfies/:id', function(req, res) {
  console.log('PUT this', req.params.id);

  Selfie.findOne({'_id': req.params.id}, function(err, result) {
    _sendresult(err, result, res)
  });
});

module.exports = router;
