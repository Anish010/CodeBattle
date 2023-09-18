const express = require('express');

const app = express()

const cors = require('cors');

const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")
app.use(express.json());
app.use(cookieParser())

app.use(cors());

// Import all routes
const user = require("./routes/userRoute");
const question = require("./routes/questionRoute");
const submission = require("./routes/submissionRoute");

app.use("/api/v1", user)
app.use("/api/v1",question)
app.use("/api/v1",submission)

// Middleware for error
app.use(errorMiddleware);

module.exports = app