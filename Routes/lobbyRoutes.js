const express = require("express");
const router = express.Router();
const { joinLobby, createLobby, getAllPublicSessions } = require("../Controllers/lobbyController");
const { verifyToken } = require("../Config/jwt");

// Create session
router.post("/create/", createLobby);

// Join session with session code
router.post("/join", joinLobby);

// Get all public sessions
router.get("/getAllSessions/:id", getAllPublicSessions);

module.exports = router;
