const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require("./config/database")

var cors = require('cors')

//handling uncaught exception
process.on("uncaughtException", err => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting Down the server due to uncaught exception")
    process.exit(1);
})

//config
dotenv.config({ path: "config/config.env" })

//Connecting to data base
connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//Unhandled Promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log("Shutting Down the server due to unhandled promise rejection")
    server.close(() => {
        process.exit(1);
    })
})
