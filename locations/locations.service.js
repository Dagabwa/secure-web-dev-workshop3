// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function findAll() {
    const location = await Location.find()
    if (!location) {
        throw new Error("Not Found");
    }
    return location
}

module.exports.findAll = findAll

async function findOne(id) {
    const location = await Location.findById(id)
    if (!location) {
        throw new Error("Not Found");
    }
    return location
}

module.exports.findOne = findOne

async function deleteId(id) {
    const result = await Location.deleteOne({_id: id})
    if (result.deletedCount === 0) {
        throw new Error("Not Found")
    }
    return "Done"
}

module.exports.deleteId = deleteId

async function addData(data) {
    const location = new Location(data)
    return await location.save()
}

module.exports.addData = addData

async function updateLocation(id, location) {
    const loc = await Location.findOne(id)
    return Location.updateOne({_id: id}, location)
}

module.exports.updateLocation = updateLocation