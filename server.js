//import the required modules
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')

const connectDB = require('./server/database/connection');

const app = express();

//to config the config file to PORT variable
dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080;

//log request type path and number of milli seconds
app.use(morgan("tiny"));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))

//set view engine
app.set("view engine", "ejs")
    //set template engine ejs folder path
    // app.set("views",path.resolve(__dirname,"ejs"))

//load assessts
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//load Router
app.use('/', require('./server/routes/router'))

//app is listening on PORT number
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
})