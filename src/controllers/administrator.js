const defaultData = require("../helper/default-data")
const defaultAdminNav = require("../helper/default-admin-nav")
const message = require("../helper/message")
const writeFile = require("../helper/file")
const fs = require("fs");
const path = require("path");
const {CookieProvider} = require("../helper/cookies")
const { RoleEnum } = require("../models/enum/role");
const getAllHotel = require("../services/get_all_hotel")
const getHotelById = require("../services/get_hotel_by_id")
const createHotel = require("../services/create_hotel")
const createUser = require("../services/create_user")

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

    // async addHotelHandler(req, res) {
    //     let owner = {
    //         name: req.body.chusohuu,
    //         phone: req.body.sodienthoai,
    //         email: req.body.email,
    //         password: req.body.matkhau,
    //     }
    //     let user = await createUser(owner,RoleEnum.Admin);
    //     let hotel = {
    //         owner: user,
    //         name: req.body.tenkhachsan,
    //         address: req.body.diachi,
    //         description: req.body.mieuta,
    //         star: req.body.sosao,
    //         city_id: req.body.city,
    //     }
    //     await createHotel(hotel);
    //     let cookies = new CookieProvider(req, res);
    //     cookies.setCookie(
    //         constants.has_message,
    //         JSON.stringify(message("Bạn đã thêm khách sạn mới thành công!",constantMesages.successCustom)),
    //         1
    //     );
    //     res.redirect("/administrator/hotel/");
    // }

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

    async editHotelHandler(req, res) {

    }
}
module.exports = { AdminController }