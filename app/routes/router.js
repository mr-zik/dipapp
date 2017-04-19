// var express  =  require('express');
// var router   =  module.exports = express.Router();
// var multer   = require('multer');

// var storage = multer.diskStorage({
// 	destination: function(req,file,cb) {
// 		cb(null, './uploads')
// 	},
// 	filename: function (req,file,cb) {
// 		cb(null,file.originalname);
// 	}
// });

// function fileFilter (req, file, cb){
//   var type = file.mimetype;
//   var typeArray = type.split("/");
//   if (typeArray[0] == "image") {
//   	console.log("good boy");
//     cb(null, true);
//   }else {
//     cb(null, false);
//     console.log("fuck of dude");
//   }
// }

// var upload = multer({storage : storage,fileFilter : fileFilter});










// router.get('/',function(req,res){
//   res.render('index', { title: 'Hey', message: 'Hello there!' })
// });

// router.get('/index.html',function(req,res){
//   res.render('index', { title: 'Hey', message: 'Hello there!' })
// });

// router.get('/login',function(req,res){
//   res.render('login', { title: 'Hey', message: 'Hello there!' })
// });

// // router.get('/search.html',function(req,res){
// //   res.render('search', { title: 'Search', message: 'Hello there!' })
// // });
// // router.get('/search.html',function(req,res){
// //   res.send('search');
// // });


// router.get('/addnew.html',function(req,res){
//   res.render('addnew', { title: 'Search', message: 'Hello there!' })
// });

// router.post('/addnew.html',upload.array('avatar',2),function (req,res,next) {
// 	console.log(req.files);
// 	res.send(req.files);
// });

// router.get('/profile',function(req,res){
//   res.render('profile', { title: 'Search', message: 'Hello there!' })
// });

// router.get('/show.html',function(req,res){
//   res.render('show', { title: 'Search', message: 'Hello there!' })
// });

// // IMPORTANT: Your application HAS to respond to GET /health with status 200
// //            for OpenShift health monitoring
// router.get('/health', function(req,res){
//   res.sendStatus(200);
// });