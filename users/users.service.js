const User = require('./users.model')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

function findAll(){
    return User.find({}).select("-password")
}
module.exports.findAll = findAll

async function addUser(userData) {
    try {
        const hash = await bcrypt.hash(userData.password, 10)
        const user = new User({name :userData.username, password: hash,role:'random'})
        return await user.save();
    } catch (e) {
        console.log(e)
        throw new Error("Username already used")
    }
}
module.exports.addUser = addUser

async function checkPassword(username,password){
    const user = await User.findOne({name:username})
    if(!user){
        return
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        return false
    }
    return user
}
module.exports.checkPassword = checkPassword

async function generateJWT(username) {
    return jwt.sign({sub:username}, process.env.JWT_SECRET);
}
module.exports.generateJWT = generateJWT

async function getUser(id) {
    const user = await User.findOne({_id:id}).select('-password')
    return user
}
module.exports.getUser = getUser

async function getUserByName(username) {
    return await User.findOne({name:username});
}
module.exports.getUserByName = getUserByName

async function updateUser(username, userData) {
    try {
        const hash = await bcrypt.hash(userData.password, 10)
        await User.findOneAndUpdate({name:username},{...userData, password:hash} );
        return await getUserByName(username);
    } catch (e) {
        throw new Error("Error update")
    }
}
module.exports.updateUser = updateUser

async function deleteUser(username) {
    return await User.findOneAndDelete({name : username});
}
module.exports.deleteUser = deleteUser

async function strategyHelper (param,condition){
    User.findOne(param,condition)
}
module.exports.strategyHelper = strategyHelper






