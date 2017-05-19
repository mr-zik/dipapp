// app/routes.js

// var deploymode      = require('../deploymode');
var deploymode = require('../../deploymode');
var mysql      = require('mysql');
var dbconfig   = require('../../config/database')(deploymode.mode);
var connection = mysql.createConnection(dbconfig.mysql);
var async  = require('async');

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

	//search page 

	app.get('/search',function(req,res){
		res.render('pages/search.ejs',{title:'searchpage',cat:'none'});	
	});











	app.get('/search/:cat',function(req,res){
		
		var cat = req.params.cat;
		 if(cat == 'rent' || cat == 'sell'){
		 	var path = '../partials/' + cat + '-part.ejs';
		 }else{	res.send('404');}
		
		// switch(req.params.cat){
		// 	case 'rent' : cat = 'rent-part.ejs';
		// 		break;
		// 	case 'sell' : cat = 'sell-part.ejs';
		// 		break;
		// 	default: res.send(notfound);
		// }
		 
		res.render('pages/search.ejs',{title:'searchpage',cat:cat,path:path,data:'none'});			
	});

	app.get('/search/:cat/:subcat/',function(req,res){
		var cat,subcat,path;
		
		
		switch(req.params.cat){
			case 'rent' : cat = 'rent'; 
				break;
			case 'sell' : cat = 'sell';
				break;
			default: res.send('notfound');
		}

		subcat = req.params.subcat;
		path = '../partials/search-filters/';

		if (subcat == 'houses' || subcat == 'flats') {
			path += subcat + '-filters-' + cat;
		}else if(subcat =='commercial' || subcat == 'ground'){
			path += subcat +'-filters';
		}else{
			res.send('404');
		}

		// switch(req.params.subcat){
		// 	case 'houses' : path +=	'houses-filters-' + cat; subcat = 'houses';
		// 		break;
		// 	case 'flats' : path += 'flats-filters-' + cat; subcat = 'flats';
		// 		break;
		// 	case 'commercial' : path += 'commercial-filters'; subcat = 'commercial';
		// 		break;
		// 	case 'ground' : path += 'ground-filters'; subcat = 'ground';
		// 		break;
		// 	default: res.send('404');
		// }

		
		

		



//   async.parallel([
//      		function(parallel_done) {
//          		connection.query(query1, {}, function(err, results) {
//              		if (err) return parallel_done(err);
//              		cities = results;
//              		//console.log(results);
//              		parallel_done();
//          		});
//      		},
//      		function(parallel_done) {
//          		connection.query(query2, {}, function(err, results) {
//              		if (err) return parallel_done(err);
//              		data = results;
//             	 parallel_done();
//             	 //console.log(results);
//          		});
//      		}
//   	], function(err) {
//       	 if (err) console.log(err);
//       	 //connection.end();
//       	 console.log(data.length);
//        	res.render('pages/search.ejs',{title:'searchpage',data:data,cities:cities,cat:cat,path:path,results:'true'});
//   	});



  		// src_table = "`flats_rent`";   
  		var table_name ="`"+ subcat+"_"+cat+"`";
  		//var img_table_name = "`images_flats_rent`";
  		var img_table = "`images_"+subcat+"_"+cat+"`";

  		 var query2 = 	"SELECT arr.*, "+
							" img.obj_id AS im_obj_id,"+
							" img.path AS im_path,"+
							" img.status as im_status"+
						" FROM " + table_name + " AS arr"+
						" LEFT JOIN " + img_table + " AS img"+
						" ON arr.obj_id = img.obj_id"+
						" AND img.status = 'main'";
						//" WHERE arr.obj_rooms_num=1";

		
		connection.query(query2,function(err, rows){
			if (err) {console.log(err);}
			console.log('here2');
			console.log(query2);
			data = rows;
			res.render('pages/search.ejs',{title:'searchpage',data:data,cat:cat,subcat:subcat,path:path});
		});
	});


	app.post('/search/:cat/:subcat/',function(req,res){

		var cat,subcat,path;

		switch(req.params.cat){
			case 'rent' : cat = 'rent'; 
				break;
			case 'sell' : cat = 'sell';
				break;
			default: res.send('404');
		}



		subcat = req.params.subcat;
		path = '../partials/search-filters/';

		if (subcat == 'houses' || subcat == 'flats') {
			path += subcat + '-filters-' + cat;
		}else if(subcat =='commercial' || subcat == 'ground'){
			path += subcat +'-filters';
		}else{
			res.send('404');
		}
		// switch(req.params.subcat){
		// 	case 'houses' : subcat = 'houses-filters-' + cat; 
		// 		break;
		// 	case 'flats' : subcat = 'flats-filters-' + cat;
		// 		break;
		// 	case 'commercial' : subcat = 'commercial-filters';
		// 		break;
		// 	case 'ground' : subcat = 'ground-filters';
		// 		break;
		// 	default: res.send(notfound);
		// }
		// path = '../partials/search-filters/';
		// path+=subcat;
		
		
		//console.log(req.body);

		
		//var search_params = req.body;
		var table_name ="`" + req.params.subcat+"_"+req.params.cat+"`";
		var img_table = "`images_"+subcat+"_"+cat+"`";

		var alias = 'arr';
		var query =	"SELECT arr.*, "+
						" img.obj_id AS im_obj_id,"+
						" img.path AS im_path,"+
						" img.status as im_status"+
					" FROM " + table_name + " AS arr"+
					" LEFT JOIN " + img_table + " AS img"+
					" ON arr.obj_id = img.obj_id"+
					" AND img.status = 'main'";

		var form = req.body;
		var isStart = 'true';

		//магия! не трогать! 
		function addToQuery(sign,key,val){

			let clause = (isStart == 'true') ? " WHERE " : " AND ";
			query += clause+alias + "." + key;

			if(sign == "BTW"){
				query += " BETWEEN ("+val[0]+","+val[1]+")";
			}else{
				query+=sign+"'"+val+"'";
			}
			isStart = 'false';
		}

		for(var key in form){

			//магия! не трогать!!
			//проверка по типу(array/checkbox/select)
			if (Array.isArray(form[key])) {
				
				var k = form[key];

				if (k[0] != '' && k[1] != ''){
					addToQuery("BTW",key,form[key]);
				}else if(k[0] != '' && k[1] == '') {
					addToQuery(">=",key,k[0]);
				}else if(k[0] == '' && k[1] != '') {
					addToQuery("<=",key,k[1]);
				}
			}else if (form[key] == 'on') { 
				addToQuery("=",key,1);
			}else{
				addToQuery("=",key,form[key]);
			}
			//конец магии!
		}
		
		connection.query(query,function(err, rows){
			if (err) {console.log(err);}
			console.log(rows);
			res.render('pages/search.ejs',{title:'searchpage',data:rows,cat:cat,subcat:subcat,path:path});
		});
	});


	app.get('/show/:cat/:subcat/:id',function(req,res){
		console.log(req.params);

		var table_name = "`"+req.params.subcat+"_"+ req.params.cat+"`";
		var img_table = "`images_"+req.params.subcat+"_"+req.params.cat+"`";


		var query1 = "SELECT * FROM " + table_name + " WHERE obj_id =" + req.params.id;
		var query2 = "SELECT * FROM " + img_table + " WHERE obj_id =" + req.params.id;
		
		async.parallel([
			function(parallel_done) {
				connection.query(query1, {}, function(err, results) {
					if (err) return parallel_done(err);
					object = results;
					console.log(results);
					parallel_done();
				});
			},
			function(parallel_done) {
				connection.query(query2, {}, function(err, results) {
					if (err) return parallel_done(err);
					images = results;
					parallel_done();
					console.log(results);
				});
			}
			], function(err) {
				if (err) console.log(err);
				//connection.end();
				// console.log(data.length);
				res.render('pages/show.ejs',{title:'searchpage',object:object,images:images});
			});



		// var query = "SELECT arr.*,"+
		// 				" img.obj_id AS im_obj_id,"+
		// 				" img.path AS im_path,"+
		// 				" img.status as im_status"+
		// 			" FROM " + table_name + " AS arr"+
		// 			" LEFT JOIN " + img_table + " AS img"+
		// 			" ON arr.obj_id = img.obj_id"+
		// 			//" AND img.status = 'main'";
		// 			"WHERE arr.obj_id="+ req.params.id;



		// connection.query(query,function(err, rows){
		// 	if (err) {console.log(err);}
		// 	console.log(rows);
		// 	res.render('pages/show', { title: 'Search', message: 'Hello there!',data:rows })
		// });
		
	});



	//============================================================================================================
	

	app.get('/services',function(req,res){
		res.render('pages/services', { title: 'Search', message: 'Hello there!' })
	});

	app.get('/add',function(req,res){
		res.render('pages/add', { title: 'Search', message: 'Hello there!' })
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
    if (req.user && req.user.user_status === group)
      next();
    else
    //res.send(401, 'Unauthorized');
  	res.redirect('/');
  };
};