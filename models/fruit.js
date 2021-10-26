////////////////////////////
// Import Dependencies
////////////////////////////
// Import the existing connected mongoose object from connection.js
const mongoose = require("./connection")

////////////////////////////
// Create our Fruits Model
////////////////////////////
// Destructuring Schema and model from mongoose
const {Schema, model} = mongoose
// ...Same as...
// const Schema = mongoose.Schema
// const model = mongoose.Model

// Make a fruits schema
const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

// Make a Fruit Model
const Fruit = model("Fruit", fruitSchema)

// Log the model to make sure it exists
// console.log(Fruit)

////////////////////////////
// Export the fruit model
////////////////////////////
module.exports = Fruit