const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./config/db")

const app = express()

app.use(express.json())
app.use(cors())

// Server
dotenv.config({ path: "./config/config.env" })
const PORT = process.env.PORT || 8000
connectDB()

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.listen(PORT, () => {
    console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} ON PORT: ${PORT}`)
})

// Model
const Movie = require("./model")

// Routes
app.get("/random", async (req, res) => {
    try {
        const result = await Movie.aggregate([
            {
                $sample: { size: 1 },
            },
        ])
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: "Cannot fetch" })
    }
})

app.get("/movie/:name", async (req, res) => {
    try {
        const result = await Movie.aggregate([
            {
                $match: { name: req.params.name },
            },
        ]).collation({ locale: "en", strength: 2 })

        if (!result.length) {
            return res
                .status(400)
                .json({ message: "Unable to find the resource" })
        }

        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: "Cannot fetch" })
    }
})
