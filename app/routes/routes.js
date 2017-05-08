// app/routes.js

// var deploymode      = require('../deploymode');
var deploymode = require('../../deploymode');
var mysql      = require('mysql');
var dbconfig   = require('../../config/database')(deploymode.mode);
var connection = mysql.createConnection(dbconfig.mysql);

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


	//===================================================================================================

	app.post('/search',function(req,res){
		console.log('req.params');
		console.log(req.body);

		var query = "SELECT * FROM `flat_sell` LEFT JOIN `images_flat_sell` ON `flat_sell`.flat_id = `images_flat_sell`.flat_id AND `images_flat_sell`.status = 'main'";
		if (req.body.room) {
			query += " WHERE `flat_sell`.rooms=";
			query+= req.body.room;
			
		}
		if (req.body.city) {
			query += " AND `flat_sell`.city=";
			query += "'";
			query+= req.body.city;
			query += "'";
		}
		console.log(query);
		//WHERE `images_flat_sell`.status = 'main'
		connection.query(query,function(err, rows){
			
			if (err) {console.log(err);}
            res.render('pages/search.ejs',{title:'searchpage',data:rows,type:'search'});
        });  		
	});
	app.post('/search/rent-living',function(req,res){
		console.log(req.body);
		var query = "SELECT * FROM `flat_sell` LEFT JOIN `images_flat_sell` ON `flat_sell`.flat_id = `images_flat_sell`.flat_id AND `images_flat_sell`.status = 'main'";
		if (req.body.room) {
			query += " WHERE `flat_sell`.rooms=";
			query+= req.body.room;
			
		}
		if (req.body.city) {
			query += " AND `flat_sell`.city=";
			query += "'";
			query+= req.body.city;
			query += "'";
		}
		console.log(query);
		//WHERE `images_flat_sell`.status = 'main'
		connection.query(query,function(err, rows){
			console.log(rows);
			if (err) {console.log(err);}
            res.render('pages/search.ejs',{title:'searchpage',data:rows,type:'search'});
        });  		
	});
	
	app.get('/search',function(req,res){
		res.render('pages/search.ejs',{title:'searchpage',type:'none'});	
	});

	app.get('/search/rent/',function(req,res){
		res.render('pages/search.ejs',{title:'searchpage',type:'rent'});
    });

		app.get('/search/rent-commercial/',function(req,res){
			console.log('req.params');
			console.log(req.query);
			var query = "SELECT * FROM `flat_sell` LEFT JOIN `images_flat_sell` ON `flat_sell`.flat_id = `images_flat_sell`.flat_id AND `images_flat_sell`.status = 'main'";
			
			//WHERE `images_flat_sell`.status = 'main'
			connection.query(query,function(err, rows){
				if (err) {console.log(err);}
				res.render('pages/search.ejs',{title:'searchpage',data:rows,type:'rent-commercial'});
			});
		});

		app.get('/search/rent-living/',function(req,res){
			console.log('req.params');
			console.log(req.query);
			var query = "SELECT * FROM `flat_sell` LEFT JOIN `images_flat_sell` ON `flat_sell`.flat_id = `images_flat_sell`.flat_id AND `images_flat_sell`.status = 'main'";
			
			//WHERE `images_flat_sell`.status = 'main'
			connection.query(query,function(err, rows){
				if (err) {console.log(err);}
				res.render('pages/search.ejs',{title:'searchpage',data:rows,type:'rent-living'});
			});	
		});

		app.get('/search/rent-outcity/',function(req,res){
			console.log('req.params');
			console.log(req.query);
			var query = "SELECT * FROM `flat_sell` LEFT JOIN `images_flat_sell` ON `flat_sell`.flat_id = `images_flat_sell`.flat_id AND `images_flat_sell`.status = 'main'";
			
			//WHERE `images_flat_sell`.status = 'main'
			connection.query(query,function(err, rows){
				if (err) {console.log(err);}
				res.render('pages/search.ejs',{title:'searchpage',data:rows,type:'rent-outcity'});
			});
		});

	app.get('/search/sell/',function(req,res){
		res.render('pages/search.ejs',{title:'searchpage',type:'sell'}); 		
	});

		app.get('/search/sell-commercial/',function(req,res){
			console.log('req.params');
			console.log(req.query);
			var query = "SELECT * FROM `flat_sell` LEFT JOIN `images_flat_sell` ON `flat_sell`.flat_id = `images_flat_sell`.flat_id AND `images_flat_sell`.status = 'main'";
			
			//WHERE `images_flat_sell`.status = 'main'
			connection.query(query,function(err, rows){
				if (err) {console.log(err);}
				res.render('pages/search.ejs',{title:'searchpage',data:rows,page:'sell'});
			});
		});

		app.get('/search/sell-living/',function(req,res){
			console.log('req.params');
			console.log(req.query);
			var query = "SELECT * FROM `flat_sell` LEFT JOIN `images_flat_sell` ON `flat_sell`.flat_id = `images_flat_sell`.flat_id AND `images_flat_sell`.status = 'main'";
			
			//WHERE `images_flat_sell`.status = 'main'
			connection.query(query,function(err, rows){
				if (err) {console.log(err);}
				res.render('pages/search.ejs',{title:'searchpage',data:rows,page:'sell'});
			});
		});

		app.get('/search/sell-outcity/',function(req,res){
			console.log('req.params');
			console.log(req.query);
			var query = "SELECT * FROM `flat_sell` LEFT JOIN `images_flat_sell` ON `flat_sell`.flat_id = `images_flat_sell`.flat_id AND `images_flat_sell`.status = 'main'";
			
			//WHERE `images_flat_sell`.status = 'main'
			connection.query(query,function(err, rows){
				
				if (err) {console.log(err);}
				res.render('pages/search.ejs',{title:'searchpage',data:rows,page:'sell'});
			});
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