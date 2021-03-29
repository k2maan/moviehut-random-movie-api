const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./config/db")

dotenv.config({ path: "./config/config.env" })
const PORT = process.env.PORT || 8000

const app = express()

app.use(express.json())
app.use(cors())

connectDB()

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.listen(PORT, () => {
    console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} ON PORT: ${PORT}`)
})
