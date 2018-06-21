var express = require('express');
var router = express.Router();

// Controllers.
var userController = require('./../controllers/users');
// Security guard.
const authRequest = require('./../middlewares/authRequest');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/user', userController.user_CRUD.selectall);
// router.get('/user', userController.selectall);
router.get('/user', authRequest.authenticate,userController.selectall);  // Guarded request. 
router.post('/user', userController.add);
router.put('/user/:userid', userController.update);
router.delete('/user', userController.delete);

module.exports = router;
