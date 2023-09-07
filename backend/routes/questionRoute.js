const express = require("express");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { createQuestion, submitQuestion, getAllQuestions, getQuestionById } = require("../controllers/questionsController");

router.route("/createQuestion").post(createQuestion);
// router.route("/submitQuestion").post(submitQuestion);
router.route("/questions").get(getAllQuestions);
router.route("/question/:id").get(getQuestionById);

module.exports = router;
