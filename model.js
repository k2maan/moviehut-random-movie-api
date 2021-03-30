const mongoose = require("mongoose")

const MovieSchema = new mongoose.Schema({
    name: String,
    releaseYear: Number,
    certificate: String,
    runtime: String,
    genre: String,
    imdbRating: { type: Number, index: true },
    overview: String,
    metaScore: String,
    director: String,
})

MovieSchema.index(
    { name: 1 },
    {
        collation: {
            locale: "en",
            strength: 2,
        },
    }
)

module.exports = mongoose.model("Movie", MovieSchema)
