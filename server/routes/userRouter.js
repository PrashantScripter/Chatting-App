const express = require('express');
const { RegisterUser, LoginUser, LogOutUser, GetAllUsers, GetUser, UpdateUserProfile, DeleteUserProfile } = require('../controllers/userController');
const { isAuthentication } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', RegisterUser);

router.post('/login', LoginUser);

router.get('/logout',isAuthentication, LogOutUser);

router.get('/allusers',isAuthentication, GetAllUsers);

router.get('/:id',isAuthentication, GetUser);

router.put('/updateprofile',isAuthentication, UpdateUserProfile);

router.delete('/deleteuseraccount', isAuthentication, DeleteUserProfile)

module.exports = router;