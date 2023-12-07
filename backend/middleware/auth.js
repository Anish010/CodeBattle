const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }

  if (!token) {
    return next(new ErrorHandler("Please Login !", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded User Data:", decodedData);

    const user = await User.findById(decodedData.id);
    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    return next(new ErrorHandler("Invalid Token", 401));
  }
});
