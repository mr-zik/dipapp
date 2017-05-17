// server.js

// set up ======================================================================
// get all the tools we need

const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      env          = process.env,
      deploymode   = require('./deploymode'),
      config       = require('./config/common.js')(deploymode.mode);
      //var dbconfig = require('./config/database.js')(deploymode.mode);

var   express  	   = require('express'),
	  session 	   = require('express-session'),
	  cookieParser = require('cookie-parser'),
	  bodyParser   = require('body-parser'),
	  morgan 	   = require('morgan'),
	  app 		   = express(),
	  //router       = require('./app/routes/router.js'),
	  apiRouter    = require('./app/routes/apiRouter.js'),
	  passport 	   = require('passport'),
	  flash    	   = require('connect-flash');

// configuration ===============================================================
// connect to our database
require('./config/passport')(passport); // pass passport for configuration


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
// session secret
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
} ));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
// load our routes and pass in our app and fully configured passport
require('./app/routes/routes.js')(app, passport);

//defining routes
//app.use('/',router);
app.use('/api',apiRouter);



// launch ======================================================================

app.listen(config.port, config.host, function () {
  console.log(config.port);
  console.log(config.host);
  console.log(`Application worker ${process.pid} started...`);
  console.log('MySQL running at mysql://[user:password]@' + /*mysqlHost*/ + ':' + /*mysqlPort*/ + '/nodejs');
});