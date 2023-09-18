const express = require("express");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { submitQuestion, getAllSubmissions, deleteAllSubmissions, getSubmissionById } = require("../controllers/submissionController");

router.route("/submitQuestion").post(submitQuestion);
router.route("/submissions").get(getAllSubmissions);
router.route("/submission/").get(getSubmissionById);
router.route("/deleteSubmissions").delete(deleteAllSubmissions);

module.exports = router;
