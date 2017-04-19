var express   = require('express');
var deploymode = require('./../../deploymode');

console.log(deploymode);
var dbconfig   = require('./../../config/database.js')(deploymode.mode);
var mysql     = require('mysql');
var apiRouter = module.exports = express.Router();

//DBConnection
var pool = mysql.createPool({  
      host     : dbconfig.mysql.host,
      //port     : config.mysql.port,
      user     : dbconfig.mysql.user,  
      password : dbconfig.mysql.password,  
      database : dbconfig.mysql.database
	});



apiRouter.use(function (req,res,next) {
  console.log('Something is happening.');
  next();
});

//test route to make sure everything is working (accessed at GET http://localhost:8080/api)
apiRouter.get('/', function(req, res) {
    res.send({ 
    	"urls": "localhost:8080/api/users  or   localhost:8080/api/users/userid"
    });   
});

apiRouter.route('/users')
  .post(function(req,res){
    res.json({message: 'users'}); 
  })

  .get(function(req,res){
    pool.getConnection(function(err,connection){
        if (err) { res.status(400).send(err);}

        connection.query('SELECT * FROM users', function(err, rows, fields){  
	        console.log('errors now!');
		        if (err){
		          console.log(err);
		          return;
		        }
	        //connection.release();
			console.log(rows[0]); 
	        res.json(rows);
      	});  
    });
  });

apiRouter.route('/users/:user_id')
  .post(function(req,res){
    res.json({message: req.params.user_id}); 
  })

  .get(function(req,res){
    pool.getConnection(function(err,connection){
        if (err) {res.status(400).send(err);}

        var q ='SELECT * FROM users WHERE id="'+ req.params.user_id+'"';
        connection.query(q, function(err, rows, fields){  
	        console.log('errors now!');
	        if (err){
	          console.log(err);
	          return;
	        }
        	//connection.release();

	        console.log(rows); 
	        res.json(rows);
      	});  
    });
  });