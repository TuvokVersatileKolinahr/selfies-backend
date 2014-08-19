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
        method: 'POST', path: '/selfies/delete',
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
    console.log("get selfies", request);

    // if (request.query.name) {
    //     reply(findSelfies(request.query.name));
    // }
    // else {
    //   selfieProvider.findAll(function(error, items){
    //     reply(items);
    //   });
    // }
     
    reply(selfies);
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
        return p.id === parseInt(request.params.id);
    }).pop();

    reply(selfie);
  });
}

function addSelfie(request, reply) {
  selfieProvider.findAll(function(error, selfies){
   console.log("payload", payload);
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
            return p.id === parseInt(delid);
        }).pop();

        selfieProvider.delete(selfie._id, function (argument) {
            reply([{status:'ok',selfie_id:delid}]);
        });
    });

}

var selfies = [
  {
    "_id": "53f3c3f495710776d60454d9",
    "isActive": false,
    "picture": "http://placehold.it/128x128",
    "name": "Carrie Frank",
    "about": "commodo ea eu magna nostrud do ipsum minim deserunt duis",
    "uploaded": "2014-02-17T02:21:45 -01:00"
  },
  {
    "_id": "53f3c3f48e7a617cfbe8f9c9",
    "isActive": false,
    "picture": "http://placehold.it/128x128",
    "name": "Hart Brown",
    "about": "velit sit labore ad cillum proident mollit deserunt laboris culpa",
    "uploaded": "2014-06-26T16:09:50 -02:00"
  },
  {
    "_id": "53f3c3f48adec6e08a9772c3",
    "isActive": false,
    "picture": "http://placehold.it/128x128",
    "name": "Dickson Baker",
    "about": "voluptate eu sunt quis consequat occaecat in laborum in exercitation",
    "uploaded": "2014-03-13T11:41:49 -01:00"
  },
  {
    "_id": "53f3c3f452ab6fd82cc31157",
    "isActive": false,
    "picture": "http://placehold.it/128x128",
    "name": "Diane Mccarthy",
    "about": "proident aliqua anim dolore anim do sit reprehenderit minim reprehenderit",
    "uploaded": "2014-03-22T08:41:36 -01:00"
  },
  {
    "_id": "53f3c3f48c0cb0c7941992e0",
    "isActive": false,
    "picture": "http://placehold.it/128x128",
    "name": "Alexander Middleton",
    "about": "labore cillum sunt quis veniam et quis ullamco nisi minim",
    "uploaded": "2014-06-11T00:50:10 -02:00"
  },
  {
    "_id": "53f3c3f437a52a057fece8ef",
    "isActive": false,
    "picture": "http://placehold.it/128x128",
    "name": "Diann Mayer",
    "about": "qui aliquip ad in mollit cillum duis esse culpa laborum",
    "uploaded": "2014-08-04T10:35:26 -02:00"
  },
  {
    "_id": "53f3c3f4f52ce97468e24288",
    "isActive": false,
    "picture": "http://placehold.it/128x128",
    "name": "Levy Hewitt",
    "about": "veniam et in Lorem laboris et nulla id mollit id",
    "uploaded": "2014-08-03T21:27:20 -02:00"
  }
];
