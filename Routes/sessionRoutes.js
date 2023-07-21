const express = require("express");
const router = express.Router();
const { joinLobby, createLobby, getAllPublicSessions } = require("../Controllers/sessionController");
const { verifyToken } = require("../Config/jwt");

// Create session
router.post("/createLobby/:user_id", verifyToken, createLobby);

// Join session with session code
router.post("/joinLobby", verifyToken, joinLobby);

// Get all public sessions
router.get("/getAllSessions/:id", verifyToken, getAllPublicSessions);

module.exports = router;
