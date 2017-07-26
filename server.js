var app = require('./express');

var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
	secret: "some",
	resave: true,
	saveUninitialized: true,}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require('./project/app');
require('./utilities/pageres.js');
require('./utilities/filelist');

var port = process.env.PORT || 3000;
console.log('Hello! Server running on 127.0.0.1:3000');

app.listen(port);
