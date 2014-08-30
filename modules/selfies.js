var fs = require('fs');
var Joi = require('joi');
var ig = require('instagram-node').instagram();
var DtoProvider = require('./dto/DtoProvider').DtoProvider;
var selfieProvider= new DtoProvider('localhost', 27017, 'asok');
selfieProvider.setCollectionName('selfies');
var base_dir = '/webdir/tuvok.nl/selfies/selfies-frontend/';
var image_dir = 'static/';
var base_uri = 'http://selfies.tuvok.nl/';

module.exports = [
    {
        method: 'GET', path: '/selfies',
        config: {
            handler: getSelfies, 
            validate: {
                query: { name: Joi.string() }
            }
        }
    },
    {
        method: 'GET', path: '/selfies/{num}',
        config: {
            handler: getSelfies
        }
    },
    {
        method: 'GET', path: '/selfie/{id}',
        config: { handler: getSelfie } 
    },
    {
        method: 'DELETE', path: '/selfies',
        config: {
            handler: delSelfie,
            payload: { parse: true },
            validate: {
                payload: { id: Joi.string().required() } 
            }
        }
    },
    {
        method: 'POST', path: '/selfies',
        config: {
          handler: addSelfie,
          payload:{
                maxBytes: 209715200,
                output:'stream',
                parse: true
          }, 
          validate: {
            payload: {
              name: Joi.string().min(1).required(),
              about: Joi.string().min(1).required(),
              pic: Joi.binary().encoding('base64').max(10000000).required()
            }
          }
        }
    }
];

function getSelfies(request, reply) {

    if (request.query.name) {
        reply(findSelfies(request.query.name));
    }
    else if (request.params.num) {
      selfieProvider.findLastNum(request.params.num, function(error, items){
        reply(items);
      });
    }
    else {
      selfieProvider.findAll(function(error, items){
        reply(items);
      });
    }
}

function findSelfies(name) {
  selfieProvider.findAll(function(error, items){
    return items.filter(function(selfie) {
        return selfie.name.toLowerCase() === name.toLowerCase();
    });
  });
}

function getSelfie(request, reply) {
  selfieProvider.findAll(function(error, selfies){

    var selfie = selfies.filter(function(p) {
        return p._id === request.params.id;
    }).pop();

    reply(selfie);
  });
}

function addSelfie (request, reply) {
  var selfie = {
    isActive: true,
    name: request.payload.name,
    about: request.payload.about,
    uploaded: new Date()
  }

  selfieProvider.save(selfie, function (save_error, rv) {
    if (save_error) throw save_error;
    var new_selfie_id = rv[0]._id;
    var file_name_ext = new_selfie_id + '.png'
    var filename = base_dir + image_dir + file_name_ext;

    if (request.payload.pic) {
        var f = request.payload.pic;
        // console.log('f', f);
        fs.writeFile(filename, f, function(write_error) {
          if (write_error) throw write_error;

          selfie.picture = base_uri + image_dir + file_name_ext;
          console.log('Saved ', selfie);
          selfieProvider.update(new_selfie_id, selfie, function(update_error) {
            if (update_error) throw update_error;

            reply({status:'ok',statuscode:200,selfie:selfie});
          });
        });
    }
  });
}

function addSelfieFromInstagram(request, reply) {

  ig.use({ client_id: 'f8f994c3d62746a3a9635e47e2730200',
         client_secret: 'ffb55fa5cd61469f905fbb8cdbfd373a' });

  ig.tag_media_recent('selfie', function(err, medias, pagination, remaining, limit) {
    var images = [];
    for (var i = 0; i < medias.length; i++){
      images.push(medias[i].images.standard_resolution.url);
    }
    var selfie = {
      isActive: true,
      picture: images[Math.floor(Math.random()*images.length)],
      name: request.payload.name,
      about: request.payload.about,
      uploaded: new Date()
    }
    selfieProvider.save(selfie, function (argument) {
      reply([{status:'ok',selfie:selfie}]);
    });
    
  })
}

function delSelfie(request, reply) {
    delid = request.payload.id;

    selfieProvider.delete(delid, function (argument) {
        reply([{status:'ok',selfie_id:delid}]);
    });

}
