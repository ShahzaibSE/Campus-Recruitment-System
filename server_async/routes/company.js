var express = require('express');
var router = express.Router();

// Controllers.
var companyController = require('./../controllers/company');
// Security guard.
const authRequest = require('./../middlewares/authRequest');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/user', userController.user_CRUD.selectall);
// router.get('/user', userController.selectall);
router.get('/user', authRequest.authenticate,companyController.selectall);  // Guarded request. 
router.post('/user', companyController.add);
router.put('/user/:userid', companyController.update);
router.delete('/user', companyController.delete);

module.exports = router;
