const express = require("express");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { createQuestion, submitQuestion } = require("../controllers/questionsController");

router.route("/createQuestion").post(createQuestion);
router.route("/submitQuestion").post(submitQuestion);

module.exports = router;
