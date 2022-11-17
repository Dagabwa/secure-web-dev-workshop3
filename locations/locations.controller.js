// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer
const router = require('express').Router()
const locationsService = require('./locations.service')

router.get('/', (req, res) => {
    return res.status(200).send("Hello World")
})

router.get('/locations', async (req, res) => {
    try {
        const locations = await locationsService.findAll()
        return res.status(200).send(locations)
    } catch (e) {
        if (e.message === "Not Found") {
            return res.status(404).send(e.toString())
        }
        return res.status(400).send("Bad Request")
    }
})

router.get('/locations/:id', async (req, res) => {
    try {
        const location = await locationsService.findOne(req.params.id)
        return res.status(200).send(location)
    } catch (e) {
        if (e.message === "Not Found") {
            return res.status(404).send(e.toString())
        }
        return res.status(400).send("Bad Request")
    }
})

router.delete('/locations/:id', async (req, res) => {
    try {
        const result = await locationsService.deleteId(req.params.id)
        return res.status(200).send(result)
    } catch (e) {
        if (e.message === "Not Found") {
            return res.status(404).send(e.toString())
        }
        return res.status(400).send("Bad Request")
    }
})

router.post('/locations', async (req, res) => {
    console.log(req.body)
    const location = await locationsService.addData({
        ...req.body, endDate: new Date(req.body?.endDate), startDate: new Date(req.body?.startDate)
    })
    return res.status(201).send(location)
})

router.put('/locations/:id', async (req, res) => {
    try {
        const location = await locationsService.updateLocation(req.params.id, {
            ...req.body,
            endDate: new Date(req.body?.endDate),
            startDate: new Date(req.body?.startDate)
        })
        return res.status(200).send(location)
    } catch (e) {
        if (e.message === "Not Found") {
            res.status(404).send(e.toString())
        }
        res.status(400).send("Bad Request")
    }
})


module.exports = router



