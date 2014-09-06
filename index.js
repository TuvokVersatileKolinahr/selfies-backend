var Hapi = require('hapi');
var selfies = require('./modules/selfies');

// Server config
var config = { cors: true };
// Create a server with a host and port
var server = new Hapi.Server('localhost', 6523, config);

// Add the route
server.route(selfies.routes);

// Start the server
server.start();
