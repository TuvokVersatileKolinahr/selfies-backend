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
          query: { limit: Joi.string() }
        }
      }
    },
    {
      method: 'GET', path: '/selfies/{id}',
      config: {
        handler: getSelfies
      }
    },
    {
      method: 'DELETE', path: '/selfies/{id}',
      config: { handler: delSelfie } 
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
  if (request.query.limit) {
    selfieProvider.findLastNum(request.query.limit, function(error, items){
      var retval = {};
      retval.selfies = items;
      reply(retval);
    });
  } else if (request.params.id) {
    selfieProvider.findById(request.params.id, function(error, item){
      console.log("item", item);
      var retval = {};
      retval.selfies = item;
      reply(retval);
    });
  } else {
    selfieProvider.findAll(function(error, items){
      var retval = {};
      retval.selfies = items;
      reply(retval);
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
  console.log("deleting: ", request.params.id);
  if (request.params.id) {
    selfieProvider.delete(request.params.id, function (argument) {
      reply().code(204).type('application/json');
    });
  }
}
