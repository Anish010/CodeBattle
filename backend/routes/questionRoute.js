const express = require("express");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { createQuestion, getAllQuestions, getQuestionById } = require("../controllers/questionsController");
const { submitQuestion } = require("../controllers/submissionController");

router.route("/createQuestion").post( createQuestion);
router.route("/questions").get( getAllQuestions);
router.route("/question/:id").get( getQuestionById);

module.exports = router;
