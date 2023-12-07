const express = require("express");

const { registerUser, loginUser, logoutUser, getAllUsers, getAcceptedSubmissions, getAcceptedQuestionCount, getUserSubmissionCounts } = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/users").get(getAllUsers);
router.route("/login").post(loginUser);
// router.route("/logout").post(isAuthenticatedUser, logoutUser);
router.route("/accepted-submissions").get(isAuthenticatedUser, getAcceptedQuestionCount);
router.route("/user/:userId/solvedCounts").get(isAuthenticatedUser, getUserSubmissionCounts);

module.exports = router;
