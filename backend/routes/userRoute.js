const express = require('express');
const userController = require('../controllers/userController');
const protectJWT = require('../middleware/jwtProtected.js')

const router = express.Router();


router.route('/login').post(userController.login);
router.route('/signup').post(userController.signup);
router.route('/self').get(protectJWT, userController.self)
router.route('/profile').get(protectJWT, userController.profile)

module.exports = router;
