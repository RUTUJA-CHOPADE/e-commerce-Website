const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, firebaseLogin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/firebase', firebaseLogin);
router.get('/me', protect, getMe);

module.exports = router;
