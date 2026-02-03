const express = require('express')
const dotenv = require('dotenv').config()
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const dbConnection = require('./config/dbConnection')
const app = express()

// connecting to the database
dbConnection()

app.use(express.json())

// Authorization Routes
app.use('/api/auth', authRoute)

// User Routes
app.use('/api/user', userRoute)

port = process.env.PORT || 7002

app.listen(port, ()=>{
    console.log(`Server listening at port ${port}`)
})