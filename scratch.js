app.use(express.static("public"))
// "/styles.css" => "localhost:4000/styles.css"

app.use("/public", express.static("public"))
// "/public/styles.css" => "localhost:4000/public/styles.css"

app.use("/static", express.static("public"))
// "/public/styles.css" => "localhost:4000/static/styles.css"

// Ternary Operatorn (fancy if statement)
// const variable = EXPRESSION ? TRUE : FALSE
const five = 5 < 10 ? 5 : null

