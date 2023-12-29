const defaultData = require("../helper/default-data")
const message = require("../helper/message")
const {CookieProvider} = require("../helper/cookies")
const constants = require("../constants")
const constantMesages = require("../constants/message")
class StoreRunController{
    async homepage(req, res) {
        //get data from database to have username = "testuser1"
        res.render("index",{
            page: "store-run/index",
            username: "testuser1",
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