const express = require("express");
const multer = require("multer");
const { StoreRunController }  = require("../controllers/store-run");

const router = express.Router();
const upload = multer();

let storeRun = new StoreRunController();

router.route("/blog").get(storeRun.blog);
router.route("/contact").get(storeRun.contact);
router.route("/hotel").get(storeRun.hotel);
router.route("/services").get(storeRun.services);
router.route("/").get(storeRun.homepage);


module.exports = router;