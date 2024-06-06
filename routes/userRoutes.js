const express = require ('express');
const { registerUser, loginUser, logout, logoutUser } = require('../controllers/userControllers');
const requireSignIn = require('../middleware/authMiddleWare');


const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
//router.post("/logout",requireSignIn,logoutUser)

module.exports = router;
