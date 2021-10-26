////////////////////////////
// Import our Dependencies
////////////////////////////
require("dotenv").config() // Loading .env variables
const mongoose = require("mongoose")

/////////////////////////////////
// Establish Database Connection
/////////////////////////////////
// Setup the inputs for mongoose connect
const DATABASE_URL = process.env.DATABASE_URL // URL from .env
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Connect to Mongo
mongoose.connect(DATABASE_URL, CONFIG)

// Our connection messages
mongoose.connection
.on("open", () => console.log("Connected to mongo"))
.on("close", () => console.log("Disconnected from mongo"))
.on("error", (error) => console(error))

//////////////////////////
// Export the Connection
//////////////////////////
module.exports = mongoose