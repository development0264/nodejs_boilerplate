const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
require("./config/db.config");

console.log("process.env.DB_URL => ", process.env.DB_URL)
// var corsOptions = {
//     origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));
// // parse requests of content-type - application/json
app.use(express.json());
// // parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// // simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to NodeJs Boilerplate." });
// });

const mainRouter = require("./routes/index");
app.use('/', mainRouter)


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});