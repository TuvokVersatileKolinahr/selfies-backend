var Hapi = require('hapi'),
    nconf = require('nconf')
     .argv() //override the environment variables and the json file with command line options
     .env() //override the json file with environment variables
     .file({ file: './config/config.json' }), //set defaults
    selfies = require('./modules/selfies');

// Create a server with a host and port and config
var server = new Hapi.Server(nconf.get('server:host'), nconf.get('server:port'), nconf.get('server:config'));

// prevent the server from starting when we’re testing it
if (!module.parent) {
  server.start(function() {
    console.log("Server started", server.info.uri);
  });
}

// Add the route
server.route(selfies.routes);

// Start the server
server.start();

// Provide other modules (like tests) a handle to the server object
module.exports = server;