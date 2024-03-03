const {
    TypeRoomRepository, 
    RoomRepository,
    ServiceRoomRepository,
    SelectionRoomRepository,
    ImageRepository
} = require('../repositories/index');

async function getTypeRoomById(hotel, id, populate) {
    const typeRoomRepo = new TypeRoomRepository();
    const roomRepo = new RoomRepository();
    const serviceRoomRepo = new ServiceRoomRepository();
    const selectionRoomRepo = new SelectionRoomRepository();
    const imageRepo = new ImageRepository();
    let typeOfRoom =  await typeRoomRepo.selectById(id);
    if(populate){
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
            return {
                ...typeOfRoom._doc,
                rooms: roomResult,
            };
    }
    else{
        return typeOfRoom;
    }
    
}


module.exports =  getTypeRoomById ;