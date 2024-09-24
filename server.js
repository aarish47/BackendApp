const express = require("express")
const dotenv = require("dotenv").config()

const connection = require("./connect/database")

const {errorHandler} = require("./middlewares/taskMiddlewares")
const port = process.env.PORT || 5000;

// Express App
connection()
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Creating Routes
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"))

app.use(errorHandler)

app.listen(port, () => {
    console.log("Server is Running on port", port)
})