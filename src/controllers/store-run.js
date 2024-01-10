const defaultData = require("../helper/default-data")
const message = require("../helper/message")
const {CookieProvider} = require("../helper/cookies")
const constants = require("../constants")
const constantMesages = require("../constants/message") 
const getImageOfHotel = require("../services/get_image_of_hotel")
//controller nơi nhận dữ liệu từ request(req) => vào Service xử lý dữ liệu 
//=> gọi repository để truy cập vào database  thông qua models
class StoreRunController{
    async homepage(req, res) {
        //đến home/index
        res.render("index",{
            page: "home/index",
            ...defaultData(req)
        })
    }
    async blog(req, res) {
        res.render("index",{
            page: "home/blog",
            ...defaultData(req)
        })
    }

    async contact(req, res) {
        res.render("index",{
            page: "home/contact",
            ...defaultData(req)
        })
    }
    async hotel(req, res) {
        res.render("index",{
            page: "home/hotel",
            ...defaultData(req)
        })
    }
    async services(req, res) {
        res.render("index",{
            page: "home/services",
            ...defaultData(req)
        })
    }
    async room(req, res) {
        let images = await getImageOfHotel(req.hotel);
        res.render("index",{
            page: "home/room",
            images: images,
            ...defaultData(req)
        })
    }

    pageNotFound(req, res) {
        let cookies = new CookieProvider(req, res);
        cookies.setCookie(
            constants.has_message,
            JSON.stringify(message("Hi",constantMesages.errorCustom)),
            1
        );

        res.render("index",{
            page: "404"
        })
    }
}
module.exports = { StoreRunController }