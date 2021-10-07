const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const { sendResponse } = require("./helpers")
const authRouter = require("./routes/api/auth")
const contactsRouter = require("./routes/api/contacts")
const usersRouter = require("./routes/api/users")

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connection successful")
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use("/api/auth", authRouter)
app.use("/api/contacts", contactsRouter)
app.use("/api/users", usersRouter)

app.use((req, res) => {
  sendResponse({
    res,
    status: 404,
    statusMessage: "Not Found"
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err
  sendResponse({
    res,
    status: status,
    statusMessage: "error",
    data: {
      message
    }
  })
})

module.exports = app
