// config/passport.js
var deploymode      = require('../deploymode');
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
// load up the user model
var mysql    = require('mysql');
var bcrypt   = require('bcrypt-nodejs');
var dbconfig = require('./database')(deploymode.mode);
//var dbconfig = require('./database');
// console.log(dbconfig);
// var connection = mysql.createConnection(dbconfig.mysql);
var connection = mysql.createConnection(dbconfig.mysql);
module.exports = function(passport) {

    
    passport.serializeUser(function(user, done) {
        done(null, user.user_id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE user_id = ? ",
            [id], function(err, rows){
            done(err, rows[0]);
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
            
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) {
            
            connection.query("SELECT * FROM users WHERE user_login = ?",
                [username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, 
                        req.flash('signupMessage', 
                            'That username is already taken.'));
                } else {
                
                    var newUserMysql = {
                        status:'user',
                        login: username,
                        password: bcrypt.hashSync(password, null, null)  
                    };

                    var insertQuery = 
                    "INSERT INTO users ( user_login, user_password,user_status ) values (?,?,?)";

                    connection.query(insertQuery,[newUserMysql.login, 
                        newUserMysql.password, newUserMysql.status],function(err, rows) {
                        newUserMysql.user_id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );


    passport.use(
        'local-login',
        new LocalStrategy({
            
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) { 

            connection.query("SELECT * FROM users WHERE user_login = ?",
                [username], function(err, rows){
                    console.log('we are here');
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, 
                        req.flash('loginMessage', 'No user found.')); 
                }

                if (!bcrypt.compareSync(password, rows[0].user_password))
                    return done(null, false, 
                        req.flash('loginMessage', 
                            'Oops! Wrong password.')); 
                return done(null, rows[0]);
            });
        })
    );
};


//middleware for dividing users by status

// var needsGroup = function(group) {
//   return function(req, res, next) {
//     if (req.user && req.user.group === group)
//       next();
//     else
//       res.send(401, 'Unauthorized');
//   };
// };

// app.get('/api/users', 
//   passport.authenticate('local'),
//   needsGroup('admin'), 
//   function(req, res) {
//     ...
//   });