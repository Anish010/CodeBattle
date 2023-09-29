const express = require("express");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { submitQuestion, getAllSubmissions, deleteAllSubmissions, getSubmissionById, getSubmissionBySubId } = require("../controllers/submissionController");

router.route("/submitQuestion").post(submitQuestion);
router.route("/submissions").get(getAllSubmissions);
router.route("/submission/").post(getSubmissionById);
router.route("/submittedCode/:id").get(getSubmissionBySubId);
router.route("/deleteSubmissions").delete(deleteAllSubmissions);

module.exports = router;
