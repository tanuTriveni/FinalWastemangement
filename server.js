//morgan consloe pe orute ka end point
// aur kitne time pe execute hua hain vo aayega

// how to start nodemon server.js api wali 
// mbc architecture 

const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require("./config/db");
// dotenve config
dotenv.config();
//dotenv.config() is a function commonly used in Node.js applications to load environment variables from a .env file into the process.env object.
//rest object

connectDB();
const app = express()
    ;
// middlewares
app.use(express.json())


// /morgan is a popular HTTP request logger middleware for Node.js. It is used to log HTTP requests to the console or a file, providing information such as request method, URL, status code, response time, and more.

// When you use morgan("dev"), you are configuring morgan to log requests using the predefined "dev" format. This format is designed for development purposes and provides concise yet informative logging output.
app.use(morgan("dev"))
const port = process.env.PORT || 8000

//routees
app.use("/api/v1/user", require("./routes/userRoutes"))
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/collector", require("./routes/collectorroutes"))

app.listen(port, () => {
    console.log(`server running in ${process.env.NODE_MODE} MOde on port ${port}`.bgCyan.white)

})
