const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  status: {
    type: String,
  },
  userCode: {
    type : String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Submission", submissionSchema);
