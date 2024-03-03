const {HotelRepository} = require('../repositories/index');

async function getAllHotel() {
    const hotelRepo = new HotelRepository();
    return await hotelRepo.selectAll();
}


module.exports =  getAllHotel ;