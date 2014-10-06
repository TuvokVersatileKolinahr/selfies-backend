var express      = require('express'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    multer       = require('multer'),
    mongoose     = require('mongoose'),
    config       = require('./lib/configuration'),
    api          = require('./routes/api');

var app = express();

// Database
mongoose.connect('mongodb://' + config.get('mongo:host') + (config.get('mongo:port') == 27017 ? "" : ":" + config.get('mongo:port')) + '/' + config.get('mongo:db'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ dest: config.get('selfies:base_dir') + config.get('selfies:image_dir')}))

//Allow CORS
// if (config.get('server:config:cors')) {
//   console.log("Configuring server for CORS Methods: ", config.get('server:config:cors-allowed'));
//   app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Methods', config.get('server:config:cors-allowed'));
//     next();
//   });
// }

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  next();
});

if (app.get('env') === 'development') {
  app.use('/api/', api);
} else {
  app.use('/', api);
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found, man, bummer ... ');
    err.status = 404;
    next(err);
});

// error handlers
if (app.get('env') === 'development') {
  console.log("Running in development mode... port: " + config.get('server:port'));
}
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
