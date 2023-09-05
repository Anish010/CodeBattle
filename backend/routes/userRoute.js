const express = require("express");

const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").get(loginUser);

module.exports = router;
