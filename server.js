const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const connectDB = require("./config/db")
const cors = require("cors")
const rateLimit = require("express-rate-limit")

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

// CORS
app.use(cors())

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
})

app.use(limiter)

// Model
const Movie = require("./model")

// Middlware
const { advanceQuerying } = require("./middleware")

// Routes

// @desc    Get a random movie
// @routes  GET /random
// @access  Public
app.get("/api/random", async (req, res) => {
    try {
        const result = await Movie.aggregate([
            {
                $unset: "_id",
            },
            {
                $sample: { size: 1 },
            },
        ])

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

// @desc    Get/find movie by name
// @routes  GET /movie/:name
// @access  Public
app.get("/api/movie/:name", async (req, res) => {
    try {
        const result = await Movie.aggregate([
            {
                $unset: "_id",
            },
            {
                $match: { name: req.params.name },
            },
        ]).collation({ locale: "en", strength: 2 })

        if (!result.length) {
            return res.status(400).json({
                message:
                    "Oops, the requested movie does not exist in our database.",
            })
        }

        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: "Cannot fetch" })
    }
})

// @desc    Get/find 10 movies sorted by IMDB rating
// @routes  GET /movies
// @access  Public
app.get("/api/movies/", advanceQuerying(Movie), async (req, res) => {
    try {
        res.status(200).json(res.advanceQuerying)
    } catch (error) {
        res.status(400).json({ error: "Cannot fetch" })
    }
})
