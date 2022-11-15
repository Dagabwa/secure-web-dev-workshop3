const express = require('express')
const locationController = require('./locations/locations.controller')
const mongoose = require("mongoose")
require('dotenv').config()
const app = express()
const port = 3000
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(locationController)



async function main() {
	const result = await mongoose.connect(process.env.MONGO_URI)
	console.log('connected')
	app.listen(port, () => {
		console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
	})
}
main()
