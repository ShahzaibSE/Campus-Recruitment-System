var express = require('express');
var router = express.Router();

// Controllers.
var userController = require('./../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/user', userController.user_CRUD.selectall);
// router.get('/user', userController.selectall);
router.get('/user', userController.selectAll);

module.exports = router;
