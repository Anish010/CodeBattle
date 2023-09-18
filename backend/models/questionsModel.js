const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
    },
    title: {
    type: String,
    required: [true, "Please Enter a title."],
    minLength: [
      3,
      "Title of the question should have a minimum of 3 characters.",
    ],
    maxLength: [20, "Title of the question cannot exceed 20 characters."],
  },
  tags: [
    {
      type: String,
      required: [true, "Please enter at least one tag."],
    },
  ],
  description: {
    type: String,
    required: [true, "Please enter a description."],
    minLength: [10, "Description should have a minimum of 10 characters."],
  },
  exampleTestCases: [
    {
      input: {
        type: String,
      },
      output: {
        type: String,
      },
      explaination: {
        type: String,
      },
    },
  ],
  testCases: [{}],
  constraints: [
        {
            type: String,
        },
    ],
  functionPrototype: {
    type: String,
    required: true,
  },
  actualFunction: {
    type: String,
    required: true,
  },
  attemptedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", questionSchema);
