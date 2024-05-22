const express = require('express')
const { connect } = require('mongoose')
const connectDB = require('./db/connect_db')
const app = express()
const port = 4000
const web = require('./routes/web')
const fileUpload = require("express-fileupload")

var session = require('express-session')
var flash = require('connect-flash');

//cookies 
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(fileUpload({useTempFiles: true}));
// message show
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    
  }));
  
  app.use(flash());



// console.log(express)
app.use(express.urlencoded({ extended: true }));
// connect_db
connectDB()
app.set('view engine', 'ejs')

// route localhost:3000
app.use('/',web)

app.use(express.static('public'))


//server create
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
