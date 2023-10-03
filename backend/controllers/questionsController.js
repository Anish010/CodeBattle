const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const Question = require("../models/questionsModel");
const User = require("../models/userModel");
const Submission = require("../models/submissionModel");
const computeQuestionStatusMiddleware = require("../middleware/computeQuestionStatus");

//Create a question
exports.createQuestion = catchAsyncError(async (req, res, next) => {
  // Extract data from the request body
  const {
    code,
    difficulty,
    title,
    tags,
    constraints,
    description,
    exampleTestCases,
    testCases,
    functionPrototype,
    actualCode,
  } = req.body;

  try {
    // Create a new question instance
    const newQuestion = new Question({
      code,
      difficulty,
      title,
      tags,
      description,
      exampleTestCases,
      constraints,
      testCases,
      functionPrototype,
      actualCode,
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

exports.getAllQuestions = [
  computeQuestionStatusMiddleware, // Apply the middleware here

  catchAsyncError(async (req, res) => {
    // Fetch all questions
    const questions = await Question.find();

    // Create an array to store the results
    const questionResults = [];

    // Loop through each question and compute the status
    for (const question of questions) {
      const status = req.computeQuestionStatus(question);

      questionResults.push({
        code: question.code,
        title: question.title,
        difficulty: question.difficulty,
        status,
        programCode: question.code,
        questionId: question._id,
      });
    }

    res.status(200).json({
      success: true,
      message: 'All questions',
      questions: questionResults,
    });
  })
];

exports.getQuestionById = catchAsyncError(async (req, res, next) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    return next(new ErrorHandler("Question not found", 404));
  }

  res.status(200).json({
    success: true,
    data: question,
  });
});

