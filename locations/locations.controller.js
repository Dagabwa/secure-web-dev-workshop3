// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer
const router = require('express').Router()
const locationsService = require('./locations.service')
const {findAll} = require("./locations.service")
const url = require('url')

router.get('/', (req, res) => {
	return res.status(200).send("Hello World")
})

router.get('/locations', async (req, res) => {
	const locations = await locationsService.findAll()
	return res.status(200).send(locations)
})

router.get('/locations/:id', async (req, res) => {
	const id = req.params.id
	const location = await locationsService.findOne(id)
	return res.status(200).send(location)
})

router.delete('/locations/:id', async (req, res) => {
	const id = req.params.id
	const result = await locationsService.deleteId(id)
	return res.status(200).send(result)
})

router.post('/locations', async (req, res) => {
	console.log(req.body)
	const location = await locationsService.addData({...req.body, endDate : new Date(req.body?.endDate), startDate: new Date(req.body?.startDate)})
	return res.status(201).send(location)
})

router.put('/locations/:id', async (req, res) => {
	const body = {...req.body, endDate : new Date(req.body?.endDate), startDate: new Date(req.body?.startDate)}
	const location = await locationsService.updateLocation(req.params.id,body)
	return res.status(200).send(location)
})



module.exports = router



