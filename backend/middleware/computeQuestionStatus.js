const Submission = require("../models/submissionModel");
const User = require("../models/userModel");
const catchAsyncError = require("./catchAsyncError");

// middleware/computeQuestionStatusMiddleware.js

const computeQuestionStatus = (question, user) => {
  let status = '3'; // Default status

  const userAttempt = user.questionAttempted.find(
    (qa) => qa.questionId.toString() === question._id.toString()
  );

  if (userAttempt) {
    if (userAttempt.attempted && !userAttempt.solved) {
      status = '2'; // Attempted but not solved
    } else if (userAttempt.attempted && userAttempt.solved) {
      status = '1'; // Attempted and solved
    }
  }

  return status;
};

module.exports = catchAsyncError( async (req, res, next) => {
  const { userId } = req.body; // Assuming you have the userId available in req

  // Fetch the user to get their questionAttempted data
  const user = await User.findById(userId);

  // Attach the `computeQuestionStatus` function to the request object
  req.computeQuestionStatus = (question) => {
    return computeQuestionStatus(question, user);
  };

  next();
});

