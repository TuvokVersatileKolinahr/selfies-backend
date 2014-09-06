var Hapi = require('hapi'),
    nconf = require('nconf').argv() //override the environment variables and the json file with command line options
     .env() //override the json file with environment variables
     .file({ file: './config/config.json' }),
    selfies = require('./modules/selfies').init({ mongo: nconf.get('mongo'), env: nconf.get('selfies')});

console.log("selfies", selfies);
// nconf.argv() //override the environment variables and the json file with command line options
//      .env() //override the json file with environment variables
//      .file({ file: './config/config.json' }); //set defaults

// var config = {
//   mongo: nconf.get('mongo'),
//   env: nconf.get('selfies')
// };

// selfies.init(config);

// Create a server with a host and port
var server = new Hapi.Server(nconf.get('server:host'), nconf.get('server:port'), nconf.get('server:config'));

// Add the route
server.route(selfies.getRoutes());

// Start the server
server.start();