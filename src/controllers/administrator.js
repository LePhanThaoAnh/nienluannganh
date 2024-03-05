const defaultData = require("../helper/default-data")
const defaultAdminNav = require("../helper/default-admin-nav")
const message = require("../helper/message")
const constants = require("../constants")
const constantMesages = require("../constants/message"); 
const writeFile = require("../helper/file")
const fs = require("fs");
const path = require("path");
const {CookieProvider} = require("../helper/cookies")
const { RoleEnum } = require("../models/enum/role");
const getAllHotel = require("../services/get_all_hotel")
const getAllService = require("../services/get_all_service")
const getAllSelection = require("../services/get_all_selection")
const getAllTypeRoom = require("../services/get_all_type_of_rooms")
const getHotelById = require("../services/get_hotel_by_id")
const getTypeRoomById = require("../services/get_type_room_by_id")
const getServiceById = require("../services/get_service_by_id")
const getSelectionById = require("../services/get_selection_by_id")
const createHotel = require("../services/create_hotel")
const createUser = require("../services/create_user")
const createTypeRoom = require("../services/create_type_room")
const createService = require("../services/create_service")
const createSelection = require("../services/create_selection")
const updateService = require("../services/update_service")
const updateSelection = require("../services/update_selection")
const updateTypeRoom = require("../services/update_type_room")
const deleteService = require("../services/delete_service")
const deleteSelection = require("../services/delete_selection")
const deleteTypeRoom = require("../services/delete_type_room")

class AdminController{
    async hotel(req,res) {
        let hotels = await getAllHotel();
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "hotel/management",
            hotels: hotels,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }
    
    async addHotel(req, res) {
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "hotel/add",
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    async addHotelHandler(req, res) {
        let owner = {
            name: req.body.chusohuu,
            phone: req.body.sodienthoai,
            email: req.body.email,
            password: req.body.matkhau,
        }
        console.log(owner)
        let user = await createUser(owner,RoleEnum.Employee);
        
        let hotel = {
            owner: user,
            name: req.body.tenkhachsan,
            address: req.body.diachi,
            description: req.body.mieuta,
            star: req.body.sosao,
            city_id: req.body.city,
        }
        await createHotel(hotel);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm khách sạn mới thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/hotel/");
    }

    async editHotel(req, res) {
        let hotel = await getHotelById(req.params.id);
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "hotel/edit",
            hotel: hotel,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    // async editHotelHandler(req, res) {

    // }

    //quản lý service 
    async service(req,res){
        let services = await getAllService();
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "service/management",
            services: services,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    async addService(req, res) {
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "service/add",
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    async addServiceHandler(req,res){
        let service = {
            name : req.body.tendichvu,
            icon: req.body.icon,
        }
        await createService(service);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm dịch vụ mới thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/service/");
    }

    async editService(req, res) {
        let service = await getServiceById(req.params.id);
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "service/edit",
            service: service,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }
    async editServiceHandler(req,res){
        let originService = await getServiceById(req.params.id);

        originService.name = req.body.tendichvu;
        originService.icon = req.body.icon;
        await updateService(originService);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin dịch vụ thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/service/");
    }

    async deleteServiceHandler(req, res) {
        try {
            let originService = await getServiceById(req.params.id);
            await deleteService(originService._id.toString())
        } catch(e){
            console.log(e);
        }
        
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin dịch vụ thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/service/");
    }

    //quản lý lựa chọn
    async selection(req,res){
        let selections = await getAllSelection();
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "selection/management",
            selections: selections,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    async addSelection(req, res) {
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "selection/add",
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    async addSelectionHandler(req,res){
        let selection = {
            name : req.body.tendichvu,
            icon: req.body.icon,
        }
        await createSelection(selection);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm dịch vụ mới thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/selection/");
    }

    async editSelection(req, res) {
        let selection = await getSelectionById(req.params.id);
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "selection/edit",
            selection: selection,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }
    async editSelectionHandler(req,res){
        let originSelection = await getSelectionById(req.params.id);

        originSelection.name = req.body.tendichvu;
        originSelection.icon = req.body.icon;
        await updateSelection(originSelection);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin lựa chọn thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/selection/");
    }

    async deleteSelectionHandler(req, res) {
        try {
            let originSelection = await getSelectionById(req.params.id);
            await deleteSelection(originSelection._id.toString())
        } catch(e){
            console.log(e);
        }
        
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin lựa chọn thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/selection/");
    }

    //quản lý loại phòng
    async TypeRoom(req,res){
        let typeRooms = await getAllTypeRoom();
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "type_room/management",
            typeRooms: typeRooms,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    async addTypeRoom(req, res) {
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "type_room/add",
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }

    async addTypeRoomHandler(req,res){
        let typeRoom = {
            name : req.body.tendichvu,
            icon: req.body.icon,
        }
        await createTypeRoom(typeRoom);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã thêm dịch vụ mới thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/type_room/");
    }

    async editTypeRoom(req, res) {
        let typeRoom = await getTypeRoomById(req.params.id);
        res.render("index-manager",{
            page: "admin/index",
            roomPage: "type_room/edit",
            typeRoom: typeRoom,
            ...defaultAdminNav(),
            ...defaultData(req)
        })
    }
    async editTypeRoomHandler(req,res){
        let originTypeRoom = await getTypeRoomById(req.params.id);

        originTypeRoom.name = req.body.tendichvu;
        originTypeRoom.icon = req.body.icon;
        await updateTypeRoom(originTypeRoom);
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã sửa thông tin lựa chọn thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/type_room/");
    }

    async deleteTypeRoomHandler(req, res) {
        try {
            let originTypeRoom = await getTypeRoomById(req.params.id);
            await deleteTypeRoom(originTypeRoom._id.toString())
        } catch(e){
            console.log(e);
        }
        
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Bạn đã xóa thông tin lựa chọn thành công!",constantMesages.successCustom)),
            1
        );
        res.redirect("/administrator/type_room/");
    }

    //quản lý nhân viên
    // async employee(req, res) {
    //     let users = await getAllUsers(RoleEnum.Employee);
    //     res.render("index-manager",{
    //         page: "manager/index",
    //         roomPage: "user/employee/management",
    //         users: users,
    //         ...defaultManagerNav(),
    //         ...defaultData(req)
    //     })
    // }
}
module.exports = { AdminController }