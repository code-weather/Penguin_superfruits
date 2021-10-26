///////////////////////
// Import Dependencies
///////////////////////
const express = require("express") // express for Router function
const Fruit = require("../models/fruit.js") // fruit model

/////////////////
// Create router
/////////////////
const router = express.Router()

/////////////////////////////////
// Router Middleware
/////////////////////////////////

// Middleware to check if user is logged in
router.use((req, res, next) => {
    // Check if loged in
    if (req.session.loggedIn){
        // Send to routes
        next()
    } else {
        res.redirect("/user/login")
    }
})

///////////////////////
// Routes
///////////////////////

/////////////////
// Fruits Routes - ************ GOT MOVED TO "models/seed.js" **************
/////////////////

// // Seed route - seed our starter data
// router.get("/fruits/seed", (req, res) => {
//     // Array of starter fruits
//     const startFruits = [
//         { name: "Orange", color: "orange", readyToEat: false },
//         { name: "Grape", color: "purple", readyToEat: false },
//         { name: "Banana", color: "orange", readyToEat: false },
//         { name: "Strawberry", color: "red", readyToEat: false },
//         { name: "Coconut", color: "brown", readyToEat: false },
//     ];

// ////////////////////////////////////////////////////////////////////////

//     // Delete all fruits
//     Fruit.deleteMany({})
//     .then((data) => {
//         // Seed the starter fruits
//         Fruit.create(startFruits)
//         .then((data) => {
//             // Send created fruits back to JSON
//             res.json(data)
//         })
//     })
// })

////////////////////////////////////////////////////////////////////////

// Index route - get - /fruits
router.get("/", (req, res) => {
    // Find all the fruits
    // Fruit.find({})
    Fruit.find({username: req.session.username})
    .then((fruits) => {
        // Render the index template with the fruits
        res.render("fruits/index.liquid", {fruits})
    })
    // error handling
    .catch((error) => {
        res.json({error})
    })
})

////////////////////////////////////////////////////////////////////////

// New route - get - "/fruits/new"
router.get("/new", (req, res) => {
    res.render("fruits/new.liquid")
})

////////////////////////////////////////////////////////////////////////

// Create - post request - /fruits
router.post("/", (req, res) => {

    // Convert the checkbox property to true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false

    // Add the username to req.body, to track user...added after username and password
    req.body.username = req.session.username

    // Create the new fruit
    Fruit.create(req.body)
    .then((fruit) => {
        // redirect the user back to the index route
        res.redirect("/fruits")
    })
    // Error handling
    .catch((error) => {
        res.json({error})
    })
})

////////////////////////////////////////////////////////////////////////

// Edit route - get request - /fruits/:id/edit
router.get("/:id/edit", (req, res) => {
    // Get the "id" from params
    const id = req.params.id

    // Get the fruit with the matching "id"
    Fruit.findById(id)
    .then((fruit) => {
        // Render the edit page template with the fruit data
        res.render("fruits/edit.liquid", {fruit})
    })
    // Error handling
    .catch((error) => {
        res.json({error})
    })
})

////////////////////////////////////////////////////////////////////////

// Update route - put request - "/fruits/:id"
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    
    // convert the checkbox property to true or false
    req.body.readyToEat = req.body.readyToEat == "on" ? true : false
    console.log(req.body)

    // update the item with the matching id
    Fruit.findByIdAndUpdate(id, req.body, {new: true})
    .then((fruit) => {
        // redirect user back to index
        res.redirect("/fruits")
    })
     // error handling
    .catch((error) => {
        res.json({error})
    })
})

////////////////////////////////////////////////////////////////////////

// destroy route - delete request - /fruits/:id
router.delete("/:id", (req, res) => {
    // grab the id from params
    const idFruit = req.params.id
    // delete the fruit
    Fruit.findByIdAndRemove(idFruit)
    .then((fruit) => {
        // redirect user back to index
        res.redirect("/fruits")
    })
     // error handling
    .catch((error) => {
        res.json({error})
    })
})

////////////////////////////////////////////////////////////////////////

// Show route - get - /fruits/:id
router.get("/:id", (req, res) => {
    // Get the id from params
    const id = req.params.id

    // Get that particular fruit from the dtabase
    Fruit.findById(id)
    .then((fruit) => {
        // Render the show template with the fruit
        res.render("fruits/show.liquid", {fruit})
    })
    // error handling
    .catch((error) => {
    res.json({error})
    })
})

///////////////////////
// Export the router
///////////////////////
module.exports = router