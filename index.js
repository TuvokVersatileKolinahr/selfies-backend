var Hapi = require('hapi');
var selfies = require('./modules/selfies');

// Server config
var config = { };
// Create a server with a host and port
var server = new Hapi.Server('localhost', 6523);

// Add the route
server.route(selfies);

// Start the server
server.start();