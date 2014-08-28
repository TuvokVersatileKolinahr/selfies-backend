var fs = require('fs');
var Joi = require('joi');
var ig = require('instagram-node').instagram();
var DtoProvider = require('./dto/DtoProvider').DtoProvider;
var selfieProvider= new DtoProvider('localhost', 27017, 'asok');
selfieProvider.setCollectionName('selfies');

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
                maxBytes:209715200,
                parse: true
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
    /**
    * can be more effective hoor, daar nie van
    **/
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

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

function addSelfie (request, reply) {
console.log('request', request);
  // request.payload["name"].pipe(fs.createWriteStream("test"));

  var selfie = {
    isActive: true,
    name: request.payload.name,
    about: request.payload.about,
    uploaded: new Date()
  }
  console.log('selfie', selfie);
  // selfieProvider.save(selfie, function (saveerr, rv) {
  //   if (saveerr) throw saveerr;

  //   var imageBuffer = decodeBase64Image(request.payload.pic);
  //   var new_selfie_id = rv[0]._id;
  //   var filename = '/webdir/tuvok.nl/selfies/selfies-frontend/static/' + new_selfie_id + '.png';
  //   fs.writeFile(filename, imageBuffer.data, function(writeerr) {   
  //     if (writeerr) throw writeerr;
  //     console.log('It\'s saved!');
  //     selfie.picture = filename;
  //     selfieProvider.update(new_selfie_id, selfie, function(upderr) {
  //       if (upderr) throw upderr;

  //       reply({status:'ok',statuscode:200,selfie:selfie});
  //     });
  //    });

  // });
  reply({status:'ok',statuscode:200,data:selfie});
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
