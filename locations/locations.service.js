// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find()
}
module.exports.findAll = findAll

function findOne(id) {
	return Location.findById(id)
}
module.exports.findOne = findOne

function deleteId(id) {
	return Location.findOneAndDelete({_id:id})
}
module.exports.deleteId = deleteId

async function addData (data){
	const location = new Location(data)
	return await location.save()
}
module.exports.addData = addData

function updateLocation(id,location){
		return Location.updateOne({_id: id}, location)
}
module.exports.updateLocation = updateLocation