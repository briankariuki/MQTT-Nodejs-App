const express = require("express");
const AuthenticationController = require("../controllers/AuthenticationController");
const { auth } = require("../../middleware/authorization");
const router = express.Router();

// @route POST api/user
// @desc Register a User
// @access Public
router.get("/", auth, AuthenticationController.user);
module.exports = router;
