const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const Question = require("../models/questionsModel");
const User = require("../models/userModel");
const Submission = require("../models/submissionModel");

exports.submitQuestion = catchAsyncError(async (req, res, next) => {
  const { userId, questionId, userCode } = req.body;
  const question = await Question.findById(questionId);

  const testCases = question.testCases;

  //evaluation actual function
  var actualTestCasesResults = [];

  const actualFunctionRes = new Function(question.actualCode);
  const actualFunctionRes1 = actualFunctionRes();

  for (let i = 0; i < testCases.length; i++) {
    actualTestCasesResults[i] = actualFunctionRes1(
      testCases[i].arrayInput,
      testCases[i].variable1
    );
  }

  //evaluating user code
  const userFunctionRes = new Function(userCode);
  const userFuctionRes1 = userFunctionRes();
  var userTestCasesResults = [];

  for (let i = 0; i < testCases.length; i++) {
    userTestCasesResults[i] = userFuctionRes1(
      testCases[i].arrayInput,
      testCases[i].variable1
    );
  }

  //Comparing both user code and actual code
  let flag = -1;
  for (let i = 0; i < testCases.length; i++) {
    if (actualTestCasesResults[i] !== userTestCasesResults[i]) {
      flag = i;
    }
  }
  if (flag !== -1) {
    if (question && !question.attemptedBy.includes(userId))
      await question.updateOne({
        $push: { attemptedBy: userId },
      });

    const user = await User.findById(userId);
    if (user && !user.questionAttempted.includes(questionId)) {
      await user.updateOne({
        $push: { questionAttempted: questionId },
      });
    }

    try {
      const newSubmission = new Submission({
        userId: userId,
        questionId: questionId,
        status: "Wrong Answer",
        userCode : userCode
      });

      const savedSubmission = await newSubmission.save();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to save submission",
      });
    }
    res.status(201).json({
      success: true,
      message: "Wrong Answer",
      data: userTestCasesResults,
    });
  } else {
    await question.updateOne({
      $push: { attemptedBy: userId },
    });

    await User.updateOne({
      $push: { questionAttempted: questionId },
    });

    try {
      const newSubmission = new Submission({
        userId: userId,
        questionId: questionId,
        status: "Accepted",
        userCode : userCode
      });

      const savedSubmission = await newSubmission.save();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to save submission",
      });
    }
    res.status(200).json({
      success: true,
      message: "Accepted",
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
  const { userId, questionId } = req.query;

  // Use the userId and questionId to filter submissions
  const submissions = await Submission.find({ userId, questionId });

  if (!submissions) {
    return next(new ErrorHandler("Submissions not found", 404));
  }

  res.status(200).json({
    success: true,
    data: submissions,
  });
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
