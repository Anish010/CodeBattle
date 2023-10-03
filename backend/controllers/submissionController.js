const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const Question = require("../models/questionsModel");
const User = require("../models/userModel");
const Submission = require("../models/submissionModel");

const setSubmission = (userId, questionId, status, data) => {
  const newSubmission = new Submission({
    userId: userId,
    questionId: questionId,
    status: status,
    userCode: data,
  });

  return newSubmission;
};
exports.submitQuestion = catchAsyncError(async (req, res, next) => {
  const { userId, questionId, userCode } = req.body;

  console.log();
  const question = await Question.findById(questionId);
  const testCases = question.testCases;

  try {
    // Evaluate user code
    const userFunctionRes = new Function(userCode);
    const userFuctionRes1 = userFunctionRes();

    // Check if the user's code contains a return statement
    if (typeof userFuctionRes1 !== "function") {
      return res.status(400).json({
        success: false,
        message: "Something wrong in the function. It should return.",
      });
    }

    var userTestCasesResults = [];

    for (let i = 0; i < testCases.length; i++) {
      userTestCasesResults[i] = userFuctionRes1(
        testCases[i].arrayInput,
        testCases[i].variable1
      );
    }

    // Evaluate actual function
    var actualTestCasesResults = [];

    const actualFunctionRes = new Function(question.actualCode);
    const actualFunctionRes1 = actualFunctionRes();

    for (let i = 0; i < testCases.length; i++) {
      actualTestCasesResults[i] = actualFunctionRes1(
        testCases[i].arrayInput,
        testCases[i].variable1
      );
    }

    // Compare both user code and actual code
    let flag = -1;
    for (let i = 0; i < testCases.length; i++) {
      if (actualTestCasesResults[i] !== userTestCasesResults[i]) {
        flag = i;
        break;
      }
    }

    //Wrong Answer
    if (flag !== -1) {
      if (question && !question.attemptedBy.includes(userId)) {
        await question.updateOne({
          $addToSet: { attemptedBy: userId },
        });
      }

      const user = await User.findById(userId);
      if (user) {
        const questionIdString = questionId.toString();
        const existingQuestion = user.questionAttempted.find(
          (qa) => qa.questionId.toString() === questionIdString
        );

        if (!existingQuestion) {
          user.questionAttempted.push({
            questionId: questionIdString,
            attempted: true,
          });

          await user.save();
        }
      }

      try {
        const newSubmission = setSubmission(
          userId,
          questionId,
          "Wrong Answer",
          userCode
        );

        await newSubmission.save();
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Unable to save submission",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Wrong Answer",
        data: userTestCasesResults,
      });
    }
    //Accepted
    else {
      await question.updateOne({
        $addToSet: { attemptedBy: userId },
      });

      const user = await User.findById(userId);
      if (user) {
        const questionIdString = questionId.toString();
        const existingQuestion = user.questionAttempted.find(
          (qa) => qa.questionId.toString() === questionIdString
        );

        if (!existingQuestion) {
          user.questionAttempted.push({
            questionId: questionIdString,
            attempted: true,
            solved: true, // Set both attempted and solved to true for a new "Accepted" submission
          });

          await user.save();
        } else if (!existingQuestion.solved) {
          // Update the 'solved' field to true for a new "Accepted" submission
          existingQuestion.solved = true;
          await user.save();
        }
      }
      try {
        const newSubmission = setSubmission(
          userId,
          questionId,
          "Accepted",
          userCode
        );

        await newSubmission.save();
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Unable to save submission",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Accepted",
      });
    }
  } catch (error) {
    // Handle user code error (e.g., SyntaxError)
    const newSubmission = setSubmission(
      userId,
      questionId,
      "Wrong Answer",
      userCode
    );

    await newSubmission.save();
    return res.status(400).json({
      success: false,
      message: "Error in code: " + error.message,
    });
  }
});

exports.getAllSubmissions = catchAsyncError(async (req, res, next) => {
  const questions = await Submission.find({});

  res.status(200).json({
    success: true,
    message: "All Submissions",
    questions,
  });
});
exports.getSubmissionById = catchAsyncError(async (req, res, next) => {
  const requestData = req.body;
  const { userId, questionId } = requestData;
  // Use the userId and questionId to filter submissions
  try {
    const submissions = await Submission.find({ userId, questionId });

    if (!submissions) {
      return next(new ErrorHandler("Submissions not found", 404));
    }

    res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    // Log the error for debugging
    console.error(error);
    // Handle the error and send an appropriate response
    return next(new ErrorHandler("Error fetching submissions", 500));
  }
});

exports.deleteAllSubmissions = async (req, res) => {
  try {
    // Use Mongoose's deleteMany method to delete all submissions
    const result = await Submission.deleteMany({});

    // Check the result to see if any submissions were deleted
    if (result.deletedCount > 0) {
      // Update all documents in the Question collection to remove values from attemptedBy array
      await Question.updateMany({}, { $set: { attemptedBy: [] } });
      await User.updateMany({}, { $set: { questionAttempted: [] } });
      return res.status(200).json({
        success: true,
        message: `Deleted ${result.deletedCount} submissions.`,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No submissions found to delete.",
      });
    }
  } catch (error) {
    console.error("Error deleting submissions:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting submissions.",
    });
  }
};

//get Submission by submissionId
exports.getSubmissionBySubId = catchAsyncError(async (req, res, next) => {
  const submission = await Submission.findById(req.params.id);

  if (!submission) {
    return next(new ErrorHandler("Submission not found", 404));
  }

  res.status(200).json({
    success: true,
    data: submission,
  });
});
