const User = require('./users.model')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

function findAll(){
    return User.find({}).select("-password")
}
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

async function generateJWT(username) {
    return jwt.sign({sub:username}, process.env.JWT_SECRET);
}

async function getUser(id) {
    const user = await User.findOne({_id:id}).select('-password')
    return user
}

async function getUserByName(username) {
    return await User.findOne({name:username});
}

async function updateUser(username, userData) {
    try {
        const hash = await bcrypt.hash(userData.password, 10)
        await User.findOneAndUpdate({name:username},{...userData, password:hash} );
        return await getUserByName(username);
    } catch (e) {
        console.log(e)
        throw new Error("Error when updating")
    }
}

async function deleteUser(username) {
    return await User.findOneAndDelete({name : username});
}

module.exports.addUser = addUser
module.exports.findAll = findAll
module.exports.checkPassword = checkPassword
module.exports.getUser = getUser
module.exports.getUserByName = getUserByName
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
module.exports.generateJWT = generateJWT