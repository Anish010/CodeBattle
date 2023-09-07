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

app.use("/api/v1", user)
app.use("/api/v1",question)

// Middleware for error
app.use(errorMiddleware);

module.exports = app