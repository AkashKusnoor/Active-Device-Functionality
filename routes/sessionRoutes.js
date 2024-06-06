const express = require ('express');
//const verifyToken = require('../middleware/authMiddleWare');
const { activeSessions, logoutFromAllDevices, logoutFromDevice } = require('../controllers/sessionController');
const requireSignIn = require('../middleware/authMiddleWare');

const router = express.Router();

//router.get('/active-sessions', verifyToken, activeSessions)
router.get("/active-sessions", requireSignIn, activeSessions)
router.post('/logout/:sessionId',requireSignIn, logoutFromDevice)
router.post('/logout-all', requireSignIn, logoutFromAllDevices)

module.exports =  router;       