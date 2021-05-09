const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);

router.route('/').get().post();

router.route('/:id').get().patch().delete();

module.exports = router;
