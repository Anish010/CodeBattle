const express = require("express");

const { registerUser, loginUser, logoutUser, getAllUsers, getAcceptedSubmissions, getAcceptedQuestionCount } = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/users").get(getAllUsers);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/accepted-submissions").get(getAcceptedQuestionCount);

module.exports = router;
