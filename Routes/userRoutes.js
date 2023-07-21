const express = require("express");
const router = express.Router();
const { createUser, login, getUserInfo} = require("../Controllers/userController");
const { verifyToken } = require("../Config/jwt");

// Create User {sign up}
router.post("/signup", signup);

// Login
router.post("/login", login);

//Get User Info with all prev tests
router.get("/getUser/:id",verifyToken, getUserInfo);

module.exports = router;
