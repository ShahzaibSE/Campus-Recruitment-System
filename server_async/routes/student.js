var express = require('express');
var router = express.Router();

// Controllers.
var studentController = require('./../controllers/student');
// Security guard.
const authRequest = require('./../middlewares/authRequest');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/user', userController.user_CRUD.selectall);
// router.get('/user', userController.selectall);
router.get('/user', authRequest.authenticate,studentController.selectall);  // Guarded request. 
router.post('/user', studentController.add);
router.put('/user/:userid', studentController.update);
router.delete('/user', studentController.delete);

module.exports = router;
