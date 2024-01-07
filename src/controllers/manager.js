const defaultData = require("../helper/default-data")
const defaultManagerNav = require("../helper/default-manager-nav")
const message = require("../helper/message")
const writeFile = require("../helper/file")
const fs = require("fs");
const path = require("path");
const {CookieProvider} = require("../helper/cookies")
const getAllRooms  = require("../services/get_all_rooms")
const getAllTypeRooms  = require("../services/get_all_type_of_rooms")
const getAllSelection  = require("../services/get_all_selection")
const getAllService  = require("../services/get_all_service")
const getTypeRoomById  = require("../services/get_type_room_by_id")
const getServiceById  = require("../services/get_service_by_id")
const getRoomById  = require("../services/get_room_by_id")
const getSelectionById  = require("../services/get_selection_by_id")
const getImageByFilter  = require("../services/get_image_by_filter")
const createRoom  = require("../services/create_room")
const createImage  = require("../services/create_image")
const createServiceRoom  = require("../services/create_service_room")
const createSelectionRoom  = require("../services/create_selection_room")
const updateRoom = require("../services/update_room");
const deleteServiceRoomByFilter = require("../services/delete_service_room_by_filter");
const deleteSelectionRoomByFilter = require("../services/delete_selection_room_by_filter");
const deleteImageByFilter = require("../services/delete_image_by_filter");

const constants = require("../constants")
const constantMesages = require("../constants/message") 
const { get } = require("mongoose")
//controller nơi nhận dữ liệu từ request(req) => vào Service xử lý dữ liệu 
//=> gọi repository để truy cập vào database  thông qua models
class ManagerController{
    async room(req, res) {
        let rooms = await getAllRooms({
            hotel: req.hotel,
        });
        res.render("index-manager",{
            page: "manager/index",
            roomPage: "management",
            rooms: rooms,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async addRoom(req, res) {
        let typeRooms = await getAllTypeRooms();
        let serviceRooms = await getAllService();
        let selectionRooms = await getAllSelection();
        res.render("index-manager",{
            page: "manager/index",
            roomPage: "add",
            typeRooms: typeRooms,
            serviceRooms: serviceRooms,
            selectionRooms: selectionRooms,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }


    async addRoomHandler(req, res) {
        let typeRoom = await getTypeRoomById(req.body.loaiphong);
        let images = req.files.hinhanh;
        let services = req.body.dichvu;
        let selections = req.body.luachon;

        let room = {
            hotel: req.hotel,
            name: req.body.tenphong,
            original_price: req.body.giaphong,
            number_room: req.body.sophong,
            description: req.body.mota,
            type_room: typeRoom,
        }
        let roomResult = await createRoom(room);
        for(let serviceId of services){
            let service = await getServiceById(serviceId);
            let serviceRoom = {
                room: roomResult,
                service: service,
            }
            await createServiceRoom(serviceRoom);
        }

        for(let selectionId of selections){
            let selection = await getSelectionById(selectionId);
            let selectionRoom = {
                room: roomResult,
                selection: selection,
            }
            await createSelectionRoom(selectionRoom);
        }

        for (let image of images) {
            let savedImage = writeFile(
                image.buffer,
                image.mimetype
            );
            let data = {
                url: `/uploads/${savedImage}`,
                room: roomResult
            }
            await createImage(data);
        }
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm phòng mới thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/room/");
        
    }

    async editRoom(req,res){
        let room = await getRoomById(req.params.id,true);
        let typeRooms = await getAllTypeRooms();
        let serviceRooms = await getAllService();
        let selectionRooms = await getAllSelection();

        res.render("index-manager",{
            page: "manager/index",
            roomPage: "edit",
            room: room,
            typeRooms: typeRooms,
            serviceRooms: serviceRooms,
            selectionRooms: selectionRooms,
            ...defaultManagerNav(),
            ...defaultData(req)
        })
    }

    async editRoomHandler(req, res) {
        let originRoom = await getRoomById(req.params.id,false);
        let typeRoom = await getTypeRoomById(req.body.loaiphong);
        let images = req.files.hinhanh;
        let services = req.body.dichvu;
        let selections = req.body.luachon;

        originRoom.hotel = req.hotel;
        originRoom.name = req.body.tenphong;
        originRoom.original_price = req.body.giaphong;
        originRoom.number_room = req.body.sophong;
        originRoom.description = req.body.mota;
        originRoom.type_room = typeRoom;
        
        await updateRoom(originRoom);
        await deleteServiceRoomByFilter({room : originRoom})
        await deleteSelectionRoomByFilter({room : originRoom})
        for(let serviceId of services){
            let service = await getServiceById(serviceId);
            let serviceRoom = {
                room: originRoom,
                service: service,
            }
            await createServiceRoom(serviceRoom);
        }

        for(let selectionId of selections){
            let selection = await getSelectionById(selectionId);
            let selectionRoom = {
                room: originRoom,
                selection: selection,
            }
            await createSelectionRoom(selectionRoom);
        }
        if(images != undefined && images.length != 0){
            let oldImages = await getImageByFilter({room : originRoom})
            for(let image of oldImages){
                let filePath = path.join(__dirname, "..", "public") + image.url;
                fs.unlinkSync(filePath);
            }
            await deleteImageByFilter({room : originRoom})
    
            for (let image of images) {
                let savedImage = writeFile(
                    image.buffer,
                    image.mimetype
                );
                let data = {
                    url: `/uploads/${savedImage}`,
                    room: originRoom
                }
                await createImage(data);
            }
        }
        
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin phòng thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/manager/room/");
        
    }




}
module.exports = { ManagerController }