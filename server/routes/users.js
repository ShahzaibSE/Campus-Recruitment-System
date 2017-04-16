var express = require('express');
var user = express.Router();

// |--------------------------------- Controllers -------------------------------------|
//Auhorization
var acl = require('./../controllers/acl');
var userController = require('./../controllers/users');

/* GET users listing. */
// user.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

user.post('/create',userController.create);
user.post('/signin',userController.signin);

module.exports = user;
