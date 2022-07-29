const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// config env
dotenv.config()

// express app
const app = express()
const PORT = process.env.PORT || 8000

// middleware
app.use(express.json())

// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
            console.log(`Connected to DB & listening on PORT: ${PORT}`)
        })
    })
    .catch((error) => { console.log(error) })

