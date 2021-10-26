/////////////////////////////
//Import Dependencies
/////////////////////////////
const mongoose = require("./connection")
const Fruit = require("./fruit")

///////////////////////////////
// Seed Code
///////////////////////////////

// Save the connection in it a variable
const db = mongoose.connection

// Make sure code doesn't run till connection is open
db.on("open", () => {
    // Array of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
    ];

// Delete all fruits
Fruit.deleteMany({}).then((data) => {
    // Seed the starter fruits
    Fruit.create(startFruits).then((data) => {
        console.log(data)
        db.close()
        })
    })
})