const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const ticketRoute = require('./routes/tickets')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')

require('dotenv').config()


const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json()); 

app.use(mongoSanitize())

const url = 'mongodb://localhost:27017/tambolaTicket'
mongoose.connect(url).then(() => console.log("Database Connected"))
.catch(err => console.log(err))

app.use('/auth', authRoute)
app.use('/tickets', ticketRoute)

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening to Port ${port}`))