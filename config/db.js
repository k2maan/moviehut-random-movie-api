const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({ path: "./config/config.env" })

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log(`Database Connected at: ${conn.connection.host}`)
}

module.exports = connectDB
