const mongoose = require("mongoose");

const validator = require("validator")

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter a username."],
        maxLength: [30, "Username cannot exceed 30 characters."],
        minLength : [5, "Username should have minimum 5 characters."]
    },
    email: {
        type: String,
        required: [true, "Please, enter your email id."],
        unique: true,
        validate: [validator.isEmail, "Please, enter a valid email id."]
    },
    password: {
        type: String,
        required: [true, "Please, enter the passowrd."],
        minLength: [8, "Password should have minimum 8 characters"],
        select: false
    },
    questionAttempted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],

})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)

}

//JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

module.exports = mongoose.model("User", userSchema)