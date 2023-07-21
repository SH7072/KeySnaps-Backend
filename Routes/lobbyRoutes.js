const express = require("express");
const router = express.Router();
const { joinLobby, createLobby, getAllPublicSessions, getLobby } = require("../Controllers/lobbyController");
const { verifyToken } = require("../Config/jwt");

// Create session
router.post("/create", createLobby);

// Join session with session code
router.post("/join", joinLobby);

// Get all public sessions
router.get("/getAllSessions/:id", getAllPublicSessions);

router.get("/getLobby/:id", getLobby);

module.exports = router;
