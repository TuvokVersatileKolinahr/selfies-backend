var fs = require('fs'),
    Joi = require('joi'),
    ig = require('instagram-node').instagram(),
    DtoProvider = require('./DtoProvider').DtoProvider,
    nconf = require('nconf')
     .argv() //override the environment variables and the json file with command line options
     .env() //override the json file with environment variables
     .file({ file: './config/config.json' }); //set defaults

var config = nconf.get(),
    selfieProvider= new DtoProvider(config.mongo);
    selfieProvider.setCollectionName(config.mongo.collection);

module.exports = {
  routes: [
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
      method: 'POST', path: '/selfies',
      config: {
        handler: addSelfie,
        validate: {
          payload: {
            name: Joi.string().min(1).required(),
            about: Joi.string().min(1).required(),
            pic: Joi.binary().encoding('base64').required()
          }
        }
      }
    }
  ]};
 
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
    var filename = config.selfies.base_dir + config.selfies.image_dir + file_name_ext;

    if (request.payload.pic) {
      var f = request.payload.pic;
      fs.writeFile(filename, f, function(write_error) {
        if (write_error) throw write_error;

        selfie.picture = config.selfies.base_uri + config.selfies.image_dir + file_name_ext;

        selfieProvider.update(new_selfie_id, selfie, function(update_error) {
          if (update_error) throw update_error;

          reply({status:'ok',statuscode:200,data:selfie});
        });
      });
    }
  });
}

function addSelfieFromInstagram(request, reply) {

  ig.use(config.instagram.client);

  ig.tag_media_recent(config.instagram.tag, function(err, medias, pagination, remaining, limit) {
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
