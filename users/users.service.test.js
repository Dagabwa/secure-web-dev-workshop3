const usersService = require('./users.service')
const usersModel = require('./users.model')
const locationModel = require("../locations/locations.model");
const locationsservice = require("../locations/locations.service");
const userService = require("./users.service");


jest.mock('./users.model')

describe('error if username already exists',() =>{
    it('Should return error',async () =>{
        expect( usersService.addUser({
            "username": "Davidadmin",
            "password": "123232132"
        })).rejects.toMatch("Username already used")
    })
})

describe('User get user',()=> {
    it('Should get a user', async () => {
        const result = {
            "_id": "6398806f029e0bb9d451d824",
            "name": "Davidadmin",
            "role": "admin",
            "__v": 0
        }
        console.log(userService.getUser("6398806f029e0bb9d451d824"))

    })
})

