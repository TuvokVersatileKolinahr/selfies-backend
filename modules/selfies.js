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
        method: 'PUT', path: '/selfies',
        config: {
            handler: addSelfie,
            payload: {
               maxBytes: 209715200,
               output:'stream',
               parse: true
            },
            validate: {
                payload: { name: Types.String().required().min(3) } 
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
  console.log("payload", payload);
  selfieProvider.findAll(function(error, selfies){
    if (selfies.length == 0)
    {
        var selfie = {
            id: 1,
            name: request.payload.name
        };
    } else {
        var selfie = {
            id: selfies[selfies.length - 1].id + 1,
            name: request.payload.name
        };
    }
    selfieProvider.save(selfie, function (argument) {
        reply([{status:'ok',selfie:selfie}]);
    });

  });
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
