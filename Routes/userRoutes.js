const express = require("express");
const router = express.Router();
const { createUser, login, getUser} = require("../Controllers/userController");
const { verifyToken } = require("../Config/jwt");

// Create User {sign up}
router.post("/createUser", createUser);

// Login
router.post("/login", login);

//Get User
router.get("/getUser/:id",verifyToken, getUser);

module.exports = router;
