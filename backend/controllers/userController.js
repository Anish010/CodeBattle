const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");


//Get all users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
})

//Register an user

exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { username, email, password } = req.body;

    const user = await User.create({
        username,
        email,
        password,

    })
    sendToken(user, 201, res);
});


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password)
    {
        return next(new ErrorHandler("Please, enter email & password.", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user)
    {
        return next(new ErrorHandler("Invalid Email or password", 401));
    }
    
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or password", 401));
    }
    
    // Remove the 'password' field from the user object
    user.password = undefined;
    sendToken(user, 200, res);
})

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