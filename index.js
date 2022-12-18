const express = require('express')
const locationController = require('./locations/locations.controller')
const userController = require('./users/users.controller')

const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const localStrategy = require("./strategies/local.strategy")
const jwtStrategy = require("./strategies/JWTStrategies")

require('dotenv').config()

app.use(bodyParser.json())
app.use(locationController)
app.use(userController)


app.listen(port, async () => {
	await mongoose.connect(process.env.MONGO_URI)
	console.log("Connected")
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
});