const express = require("express");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { createQuestion, getAllQuestions, getQuestionById, getTotalQuestions } = require("../controllers/questionsController");
const { submitQuestion } = require("../controllers/submissionController");

router.route("/createQuestion").post(isAuthenticatedUser, createQuestion);
router.route("/questions").post(isAuthenticatedUser, getAllQuestions);
router.route("/question/:id").get(isAuthenticatedUser, getQuestionById);
router.route("/progress").get(isAuthenticatedUser, getTotalQuestions);

module.exports = router;
