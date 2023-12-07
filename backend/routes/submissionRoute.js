const express = require("express");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { submitQuestion, getAllSubmissions, deleteAllSubmissions, getSubmissionById, getSubmissionBySubId} = require("../controllers/submissionController");

router.route("/submitQuestion").post(isAuthenticatedUser, submitQuestion);
router.route("/submissions").get(isAuthenticatedUser, getAllSubmissions);
router.route("/submission/").post(isAuthenticatedUser, getSubmissionById);
router.route("/submittedCode/:id").get(isAuthenticatedUser, getSubmissionBySubId);
router.route("/deleteSubmissions").delete(isAuthenticatedUser, deleteAllSubmissions);


module.exports = router;
