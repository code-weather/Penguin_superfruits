///////////////////////////////////
// Import our Dependencies
///////////////////////////////////
require("dotenv").config() // Brings in .env vars
const express = require("express") // Web framework
const morgan = require("morgan") // Logger
const methodOverride = require("method-override") // To swap request methods
//*const mongoose = require("mongoose") // Our database library // ******* MOVED TO CONNECTION.JS ********
const path = require("path") // Helper functions for file paths
// * const Fruit = require("./models/fruit") // Added after fruit.js is created...
// ....change to controllers/fruit.js
const FruitsRouter = require("./controllers/fruit")


// ************* MOVED OVER TO CONNECTION.JS ********************

// /////////////////////////////////
// // Establish Database Connection
// /////////////////////////////////
// // Setup the inputs for mongoose connect
// const DATABASE_URL = process.env.DATABASE_URL // URL from .env
// const CONFIG = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }

// // Connect to Mongo
// mongoose.connect(DATABASE_URL, CONFIG)

// // Our connection messages
// mongoose.connection
// .on("open", () => console.log("Connected to mongo"))
// .on("close", () => console.log("Disconnected from mongo"))
// .on("error", (error) => console(error))

// ********************************************************************************

// ************ MOVED TO FRUITS.JS *************
// ////////////////////////////
// // Create our Fruits Model
// ////////////////////////////
// // Destructuring Schema and model from mongoose
// const {Schema, model} = mongoose
// // ...Same as...
// // const Schema = mongoose.Schema
// // const model = mongoose.Model

// // Make a fruits schema
// const fruitSchema = new Schema({
//     name: String,
//     color: String,
//     readToEat: Boolean
// })

// // Make a Fruit Model
// const Fruit = model("Fruit", fruitSchema)

// // Log the model to make sure it exists
// // console.log(Fruit)

// ********************************************************************************

////////////////////////////////////////////////
// Create our app with object, configure liquid
////////////////////////////////////////////////
// Import liquid
const liquid = require("liquid-express-views")

// Construct an absolute path to our views folder
const viewsFolder = path.resolve(__dirname, "views/")


// Log to see the value of viewsFolder
// console.log(viewsFolder)

// Create an app object with liquid, passing the path to the views folder
const app = liquid(express(), {root:viewsFolder})

// Same as const of "viewsFolder" and "app"
// const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})

// console.log app to confirm it exists
// console.log(app)

/////////////////////////////////////////////
// Register Our Middleware
/////////////////////////////////////////////
// logging
app.use(morgan("tiny"))

// ability to override request methods
app.use(methodOverride("_method"))

// ability to parse urlencoded from for submission
app.use(express.urlencoded({extended: true}))

// setup our public folder to serve files statically
app.use(express.static("public"))

////////////////////////////////////////
// Routes
/////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it")
})

// Register Fruits Router after creating the controllers/fruit
app.use("/fruits", FruitsRouter)

// ************* MOVED OVER TO CONTROLLERS/FRUIT.JS ********************

// /////////////////
// // Fruits Routes
// /////////////////

// // Seed route - seed our starter data
// app.get("/fruits/seed", (req, res) => {
//     // Array of starter fruits
//     const startFruits = [
//         { name: "Orange", color: "orange", readyToEat: false },
//         { name: "Grape", color: "purple", readyToEat: false },
//         { name: "Banana", color: "orange", readyToEat: false },
//         { name: "Strawberry", color: "red", readyToEat: false },
//         { name: "Coconut", color: "brown", readyToEat: false },
//     ];

// ////////////////////////////////////////////////////////////////////////

// Delete all fruits
// Fruit.deleteMany({})
// .then((data) => {
//     // Seed the starter fruits
//     Fruit.create(startFruits)
//         .then((data) => {
//     // Send created fruits back to JSON
//         res.json(data)
//         })
// })

// ////////////////////////////////////////////////////////////////////////

// // Index route - get - /fruits
// app.get("/fruits", (req, res) => {
//     // Find all the fruits
//     Fruit.find({})
//     .then((fruits) => {
//         // Render the index template with the fruits
//         res.render("fruits/index.liquid", {fruits})
//     })
//     // error handling
//     .catch((error) => {
//         res.json({error})
//     })
// })

// ////////////////////////////////////////////////////////////////////////

// // New route - get - "/fruits/new"
// app.get("/fruits/new", (req, res) => {
//     res.render("fruits/new.liquid")
// })

// ////////////////////////////////////////////////////////////////////////

// // Create - post request - /fruits
// app.post("/fruits", (req, res) => {

//     // Convert the checkbox property to true or false
//     req.body.readyToEat = req.body.readyToEat === "on" ? true : false

//     // Create the new fruit
//     Fruit.create(req.body)
//     .then((fruit) => {
//         // redirect the user back to the index route
//         res.redirect("/fruits")
//     })
//     // Error handling
//     .catch((error) => {
//         res.json({error})
//     })
// })

// ////////////////////////////////////////////////////////////////////////

// // Edit route - get request - /fruits/:id/edit
// app.get("/fruits/:id/edit", (req, res) => {
//     // Get the "id" from params
//     const id = req.params.id

//     // Get the fruit with the matching "id"
//     Fruit.findById(id)
//     .then((fruit) => {
//         // Render the edit page template with the fruit data
//         res.render("fruits/edit.liquid", {fruit})
//     })
//     // Error handling
//     .catch((error) => {
//         res.json({error})
//     })
// })

// ////////////////////////////////////////////////////////////////////////

// // Update route - put request - "/fruits/:id"
// app.put("/fruits/:id", (req, res) => {
//     // get the id from params
//     const id = req.params.id

//     // convert the checkbox property to true or false
//     req.body.readyToEat = req.body.readyToEat == "on" ? true : false
//     console.log(req.body)

//     // update the item with the matching id
//     Fruit.findByIdAndUpdate(id, req.body, {new: true})
//     .then((fruit) => {
//         // redirect user back to index
//         res.redirect("/fruits")
//     })
//      // error handling
//     .catch((error) => {
//         res.json({error})
//     })
// })

// ////////////////////////////////////////////////////////////////////////

// // destroy route - delete request - /fruits/:id
// app.delete("/fruits/:id", (req, res) => {
//     // grab the id from params
//     const idFruit = req.params.id
//     // delete the fruit
//     Fruit.findByIdAndRemove(idFruit)
//     .then((fruit) => {
//         // redirect user back to index
//         res.redirect("/fruits")
//     })
//      // error handling
//     .catch((error) => {
//         res.json({error})
//     })
// })

// ////////////////////////////////////////////////////////////////////////

// // Show route - get - /fruits/:id
// app.get("/fruits/:id", (req, res) => {
//     // Get the id from params
//     const id = req.params.id

//     // Get that particular fruit from the dtabase
//     Fruit.findById(id)
//     .then((fruit) => {
//         // Render the show template with the fruit
//         res.render("fruits/show.liquid", {fruit})
//     })
//     // error handling
//     .catch((error) => {
//     res.json({error})
//     })
// })

// ********************************************************************************

/////////////////////////////////////////////
// Setup Server Listener
/////////////////////////////////////////////
const PORT = process.env.PORT // grabbing the port number from env
app.listen(PORT, () =>  console.log(`Listening on port ${PORT}`))