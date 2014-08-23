var Instagram = require('instagram-node-lib');
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
        method: 'GET', path: '/selfies/{id}',
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
                about: Types.String().required()
              } 
            }
        }
    }
];

function getSelfies(request, reply) {

    if (request.query.name) {
        reply(findSelfies(request.query.name));
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
  Instagram.set('client_id', 'f8f994c3d62746a3a9635e47e2730200');
  Instagram.set('client_secret', 'ffb55fa5cd61469f905fbb8cdbfd373a');

  ff = Instagram.tags.recent({ name: 'blue' });

  console.log("ff", ff);
}

function delSelfie(request, reply) {
    delid = request.payload.id;

    selfieProvider.findAll(function(error, selfies){

        var selfie = selfies.filter(function(p) {
            return p._id === delid;
        }).pop();

        selfieProvider.delete(selfie._id, function (argument) {
            reply([{status:'ok',selfie_id:delid}]);
        });
    });

}
