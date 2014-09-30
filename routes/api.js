var express = require('express');
var router = express.Router();
var Selfie = require('../models/selfie-model');

router.get('/selfies', function(req, res) {
  Selfie.find({ isActive: true })
    .sort({'creationDate': -1})
    .limit(req.query.limit)
    .exec(function(err, result) {
      res.send({selfies: result});
  });
});

router.get('/selfies/:id', function(req, res) {
  Selfie.findOne({'_id': req.params.id}, function(err, result) {
    if (!err) {
      res.send({selfies: result});
    } else {
      res.status(500);
      res.send(err);
    }
  });
});

router.delete('/selfies/:id', function(req, res) {
  return Selfie.findById(req.params.id, function (err, selfie) {
    return selfie.remove(function (err) {
      if (!err) {
        res.status(204).send();
      } else {
        res.status(500);
        res.send(err);
        console.log(err);
      }
    });
  });
});

router.post('/selfies', function(req, res) {
  new Selfie({about: req.body.about, name: req.body.name, picture: "http://localhost:6524/static/uploads/" + req.files.pic.name}).save(function(err, selfie) {
    if (!err) {
      console.log("selfie", selfie);
      res.status(200).send({selfies: selfie});
    } else {
      res.status(500);
      res.send(err);
      console.log(err);
    }
  });
});

module.exports = router;
