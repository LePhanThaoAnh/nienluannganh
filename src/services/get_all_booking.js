const {BookingRepository} = require('../repositories/index');

async function getAllBookings(filter) {
    const bookingRepo = new BookingRepository();
    return await bookingRepo.select(filter);
}


module.exports =  getAllBookings ;