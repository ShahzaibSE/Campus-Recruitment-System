var express = require('express');
var router = express.Router();

// Controllers.
var roleController = require('./../controllers/role');
// Security guard.
const authRequest = require('./../middlewares/authRequest');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/user', userController.user_CRUD.selectall);
// router.get('/user', userController.selectall);
router.get('/user', authRequest.authenticate,roleController.selectall);  // Guarded request. 
router.post('/user', roleController.add);
router.put('/user/:userid', roleController.update);
router.delete('/user', roleController.delete);

module.exports = router;
