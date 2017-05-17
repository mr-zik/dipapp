//pool connectov

var mysql  = require('mysql');
var config = require('../config')();

var pool = mysql.createPool({  
	  multipleStatements: true,
      host     : config.mysql.host,
      //port     : config.mysql.port,
      user     : config.mysql.user,  
      password : config.mysql.password,  
      database : config.mysql.database

});

module.exports = function () {
	return pool;
}

//config/database.js

// module.exports = {
//     'connection': {
//         'host': 'localhost',
//         'user': 'myuser',
//         'password': 'mypassword'
//     },
// 	'database': 'my',
//  'users_table': 'users'
// };