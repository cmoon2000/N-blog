var fs           = require('fs');
var accessLog    = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog     = fs.createWriteStream('error.log', {flags:'a'});
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var MongoStore   = require('connect-mongo')(session);
var routes       = require('./routes/index');
var settings     = require('./settings');
var flash        = require('connect-flash');
var multer = require('multer');

var app = express();

app.use(multer({
  dest: './public/images',
  rename: function (fieldname, filename) {
    return filename;
  }
}));

app.use(session({
  secret: settings.cookieSecret,
  key: settings.db, // cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, // 30 days
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port
  }),
  resave: true, //deprecated
  saveUninitialized: true //deprecated
}));

// view engine setup
app.set('port', process.env.PORT || settings.env.dev.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'));
app.use(morgan('combined', {stream: accessLog}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (err, req, res, next) {
  var meta = '[' + new Date() + ']' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
});

routes(app);

var server = app.listen(app.get('port'), function () {
  if (!process.env.NODE_ENV)
    console.log('Express server listening on %s', app.get('port'));
});

module.exports = server;

