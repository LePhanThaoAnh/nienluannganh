const express = require("express");
const multer = require("multer");
const { StoreRunController }  = require("../controllers/store-run");

const router = express.Router();
const upload = multer();

let storeRun = new StoreRunController();

router.route("/").get(storeRun.homepage);

module.exports = router;