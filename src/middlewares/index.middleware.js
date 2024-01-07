const constants = require("../constants/index");
const { CookieProvider } = require("../helper/cookies");
const { HotelRepository} = require("../repositories/index");
class Middleware {
    constructor() {}
    async message(req, res, next) {
        let cookies = new CookieProvider(req, res);
        if (cookies.getCookie(constants.has_message) && cookies.getCookie(constants.has_message) != "") {
            let data = JSON.parse(cookies.getCookie(constants.has_message));
            req.messageResponse = data;
            cookies.clearCookie(constants.has_message);
        } else {
            req.messageResponse  = undefined;
        }
        const hotelRepo = new HotelRepository();
        let hotel = await hotelRepo.selectById("65941291e5ad547fa94874a6");
        req.hotel = hotel;
        next();
    }



};

module.exports = { Middleware };
