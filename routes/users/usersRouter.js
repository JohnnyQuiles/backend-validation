var express = require('express');
var router = express.Router();

const { createUser, userLogin, updateTheProfile} = require('./controller/userController');
const { checkIsEmpty, jwtMiddleware, validateCreateData, validateLoginData, validateUpdateData } = require('./lib/authMiddleware/index');

/* GET users listing. */
router.get('/', function (req, res, next) {res.send('respond with a resource')});
router.post('/create-user', checkIsEmpty, validateCreateData, createUser);
router.post('/login', checkIsEmpty, validateLoginData, userLogin);
router.post('/update-profile', jwtMiddleware, checkIsEmpty, validateUpdateData, updateTheProfile);




module.exports = router;
