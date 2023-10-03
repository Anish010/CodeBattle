const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const Submission = require("../models/submissionModel");

//Get all users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Register an user

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if the user already exists by email
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorHandler("User with this email already exists", 400));
  }

  // Initialize questionAttempted as an empty array
  const user = await User.create({
    username,
    email,
    password,
    questionAttempted: [], // Initialize the field here
  });

  sendToken(user, 201, res);
});


exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please, enter email & password.", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }

  // Remove the 'password' field from the user object
  user.password = undefined;
  sendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
});

//Get Accepted Submission by a user
exports.getAcceptedQuestionCount = catchAsyncError(async (req, res) => {
  try {
    // Find the user by ID, assuming you have the user's ID in req.body
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find all submissions with 'Accepted' status for the user
    const submissions = await Submission.find({
      userId: user._id,
      submission: "Accepted", // Assuming 'Accepted' is the status you want
    });

    // Create a Set to store unique question IDs
    const uniqueQuestionIds = new Set();

    // Filter out submissions with duplicate question IDs
    submissions.forEach((submission) => {
      const questionId = submission.questionId.toString(); // Convert ObjectId to string
      uniqueQuestionIds.add(questionId);
    });

    // Get the count of unique question IDs
    const acceptedQuestionCount = uniqueQuestionIds.size;

    res.status(200).json({ success: true, data: acceptedQuestionCount });
  } catch (error) {
    console.error("Error getting accepted question count:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
