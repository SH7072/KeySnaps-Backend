const express = require("express");
const router = express.Router();
const { signup, login, getUser } = require("../Controllers/userController");
const { verifyToken } = require("../Config/jwt");

// Create User {sign up}
router.post("/signup", signup);

// Login
router.post("/login", login);

//Get User
router.get("/getUser/:id", verifyToken, getUser);

module.exports = router;
