var fs = require('fs');
var ig = require('instagram-node').instagram();
var Types = require('hapi').types;
var DtoProvider = require('./dto/DtoProvider').DtoProvider;
var selfieProvider= new DtoProvider('localhost', 27017, 'asok');
selfieProvider.setCollectionName('selfies');

module.exports = [
    {
        method: 'GET', path: '/selfies',
        config: {
            handler: getSelfies, 
            validate: {
                query: { name: Types.string() }
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
                payload: { id: Types.String().required() } 
            }
        }
    },
    {
        method: 'POST', path: '/selfies',
        config: {
            handler: addSelfie,
            payload: {
               parse: true
            },
            validate: {
              payload: { 
                name: Types.String().required(),
                about: Types.String().required(),
                pic: Types.String().required()
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

function addSelfie(request, reply) {
  ig.use({ client_id: 'f8f994c3d62746a3a9635e47e2730200',
         client_secret: 'ffb55fa5cd61469f905fbb8cdbfd373a' });

  var base64Data = request.payload.pic.replace(/^data:image\/png;base64,/, "");

  fs.writeFile("out.png", new Buffer(base64Data, "base64"), function(err) {
    console.log(err);
  });
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
