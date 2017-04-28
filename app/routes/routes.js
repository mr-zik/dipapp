// app/routes.js
module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('pages/index.ejs');
	});

	// =====================================
	// LOGINz SECTION ======================
	// =====================================

	app.get('/login', function(req, res) {
		res.render('pages/login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile',
            failureRedirect : '/login',
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP SECTION ======================
	// =====================================

	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('pages/signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', 
		failureRedirect : '/signup',
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('pages/profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	// app.get('/search', isLoggedIn,needsGroup('admin'),function(req,res){
 	//     res.render('pages/search.ejs');
	// });
	
	app.get('/search',function(req,res){
  		res.render('pages/search.ejs');
	});

	app.get('/services',function(req,res){
		res.render('pages/services', { title: 'Search', message: 'Hello there!' })
	});

	app.get('/add',function(req,res){
		res.render('pages/add', { title: 'Search', message: 'Hello there!' })
	});

	app.get('/show',function(req,res){
		res.render('pages/show', { title: 'Search', message: 'Hello there!' })
	});

	// IMPORTANT: Your application HAS to respond to GET /health with status 200
	//            for OpenShift health monitoring
	app.get('/health', function(req,res){
	res.sendStatus(200);
	});
};






// app.post('/addnew.html',upload.array('avatar',2),function (req,res,next) {
	// console.log(req.files);
	// res.send(req.files);
	// });

// route middleware to make sure
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}

var needsGroup = function(group) {
  return function(req, res, next) {
    if (req.user && req.user.status === group)
      next();
    else
    //res.send(401, 'Unauthorized');
  	res.redirect('/');
  };
};