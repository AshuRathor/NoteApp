const connectToMongoose = require("./db")
const express = require('express')
var cors = require('cors') //to fix the cors error
connectToMongoose();

const app = express()
const port = 5000
app.use(cors()) //to fix the cors error

app.use(express.json())  //to use app.json and rend the request we have to use this as middle

//available routes: with the help of app.use will link the routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`)
})