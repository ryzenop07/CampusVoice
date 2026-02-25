const express = require('express');
const { registerCollege, registerStudent, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register/college', registerCollege);
router.post('/register/student', registerStudent);
router.post('/login', login);

module.exports = router;
