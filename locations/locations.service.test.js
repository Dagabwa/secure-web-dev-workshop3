const locationsservice= require('./locations.service')
const locationModel = require('./locations.model')

jest.mock('./locations.model')

describe('Locations FindAll',() => {
    it('Should call model find',async () =>{
        locationModel.find.mockResolvedValue([1,2,3,4])
        expect(await locationsservice.findAll()).toEqual([1,2,3,4])
        expect(locationModel.find).toHaveBeenCalledTimes(1)
    })
})

describe('Locations FindOne',()=>{
    it('Should get a location',async()=>{
        const mockLocation = {_id:'869668687676987987987987',filmName:'C est moi'}
        locationModel.findById.mockResolvedValue(mockLocation)
        expect(await locationsservice.findOne('869668687676987987987987')).toEqual(mockLocation)
        expect(locationModel.findById).toHaveBeenCalledTimes(1)
    })

    it('Should get a Location',async() =>{
        jest.resetAllMocks()
        const mockLocation = null
        locationModel.findById.mockResolvedValue(mockLocation)

        expect(async()=> await locationsservice.findOne('869668687676987987987987')).rejects.toThrow()
        expect(locationModel.findById).toHaveBeenCalledTimes(1)
    })
})