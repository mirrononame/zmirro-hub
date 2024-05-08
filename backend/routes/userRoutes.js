const express = require('express');
const { registerUser, loginUser, getUserData, logOutUser } = require('../controllers/userController');
const userValidation = require('../middleware/userValidation');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/register', userValidation.validateUser, registerUser);
router.post('/login', userValidation.validateUser, loginUser)
// router.get('/protected-route', authenticateToken, (req, res) => {
//     res.json({ message: "Welcome to the protected route, authenticated user!" });
// });
router.get('/checksession', authenticateToken, getUserData)
router.post('/logout', authenticateToken, logOutUser)


module.exports = router;
