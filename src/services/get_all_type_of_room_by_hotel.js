const {
    TypeRoomRepository, 
    RoomRepository,
    ServiceRoomRepository,
    SelectionRoomRepository,
    ImageRepository
} = require('../repositories/index');

async function getAllTypeRoomByHotel(hotel) {
    const typeRoomRepo = new TypeRoomRepository();
    const roomRepo = new RoomRepository();
    const serviceRoomRepo = new ServiceRoomRepository();
    const selectionRoomRepo = new SelectionRoomRepository();
    const imageRepo = new ImageRepository();
    let typesOfRoom =  await typeRoomRepo.selectAll();
    //list typeofroom
    let result = [];
    for(let typeOfRoom of typesOfRoom){
        let rooms = await roomRepo.select({hotel:hotel, type_room:typeOfRoom});
        //chứa list room
        let roomResult = [];
        for(let room of rooms ){
            let servicesOfRoom =  await serviceRoomRepo.select({room: room});
            let selectionsOfRoom = await selectionRoomRepo.select({room: room});
            let imagesOfRoom =  await imageRepo.select({room: room});
            roomResult.push({
                //._doc dùng để lấy data cho đúng.
                ...room._doc,
                services: servicesOfRoom.map((serviceOfRoom) => { return serviceOfRoom.service;}),
                selections: selectionsOfRoom.map((selectionOfRoom) => { return selectionOfRoom.selection;}),
                images: imagesOfRoom
            })
        }
        roomResult.sort((a, b) => a.original_price - b.original_price);
        result.push({
            ...typeOfRoom._doc,
            rooms: roomResult,
        })
    }
    return result;
}


module.exports =  getAllTypeRoomByHotel ;