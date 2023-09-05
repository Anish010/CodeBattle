const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const Problem = require("../models/questionsModel");

//Create a question

exports.createQuestion = catchAsyncError(async (req, res, next) => {
  // Extract data from the request body
  const {
    questionId,
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
      questionId,
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


exports.submitQuestion = catchAsyncError(async (req, res, next) => {

});