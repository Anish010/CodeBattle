const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const Problem = require("../models/questionsModel");
const Submission = require("../models/submissionModel");
//Create a question

exports.createQuestion = catchAsyncError(async (req, res, next) => {
  // Extract data from the request body
  const {
    code,
    difficulty,
    title,
    tags,
    description,
    exampleTestCases,
    testCases,
    functionPrototype,
    actualFunction,
  } = req.body;

  try {
    // Create a new question instance
    const newQuestion = new Problem({
      code,
      difficulty,
      title,
      tags,
      description,
      exampleTestCases,
      testCases,
      functionPrototype,
      actualFunction,
    });

    // Save the question to the database
    await newQuestion.save();

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: newQuestion,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});

exports.getAllQuestions = catchAsyncError(async (req, res, next) => {
  const questions = await Problem.find({});

  res.status(200).json({
    success: true,
    message: "All questions",
    data: questions,
  });
});

exports.getQuestionById = catchAsyncError(async (req, res, next) => {
  const question = await Problem.findById(req.params.id);

  if (!question) {
    return next(new ErrorHandler("Question not found", 404));
  }

  res.status(200).json({
    success: true,
    data: question,
  });
});

exports.submitQuestion = catchAsyncError(async (req, res, next) => {
  const { userId, questionId, actualCode } = req.body;
  const question = await Problem.findById(questionId);

  const testCases = question.testCases;

  //evaluation actual code
  var actualTestCasesResults = [];
  const actualFunction = new Function(question.actualFunction);
  const actualFuctionRes = actualFunction();

  for (let i = 0; i < testCases.length; i++) {
    actualTestCasesResults[i] = actualFuctionRes(
      testCases[i].arrayInput,
      testCases[i].variable1
    );
  }

  //evaluating user code
  const userFunction = new Function(actualCode);
  const userFuctionRes = userFunction();
  var userTestCasesResults = [];

  for (let i = 0; i < testCases.length; i++) {
    userTestCasesResults[i] = userFuctionRes(
      testCases[i].arrayInput,
      testCases[i].variable1
    );
  }

  //Comparing both user code and actual code
  let flag = -1;
  for (let i = 0; i < testCases.length; i++) {
    if (actualTestCasesResults[i] != userTestCasesResults[i]) {
      flag = i;
    }
  }
  if (flag == -1) {
    await question.updateOne({
      $push: { attemptedBy: userId },
    });

    await user.updateOne({
      $push: { questionAttempted: questionId },
    });

    try {
      const newSubmission = new Submission({
        userId: userId,
        questionId: questionId,
        submission: "Wrong Answer",
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
      data: userTestCasesResults,
    });
  }
  else {
    await question.updateOne({
      $push: { attemptedBy: userId },
    });

    await user.updateOne({
      $push: { questionAttempted: questionId },
    });

    try {
      const newSubmission = new Submission({
        userId: userId,
        questionId: questionId,
        submission: "Accepted",
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
      message: "Accepted"
    });
  }
});
