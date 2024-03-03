const express = require("express");
const multer = require("multer");
const { AdminController }  = require("../controllers/administrator");

const router = express.Router();
const upload = multer();

let admin = new AdminController();

// router.route("/hotel/add-handler").post(admin.addHotelHandler);
router.route("/hotel/add").get(admin.addHotel);
router.route("/hotel").get(admin.hotel);
router.route("/hotel/edit-handler/:id").post(admin.editHotelHandler);
router.route("/hotel/edit/:id").get(admin.editHotel);
// router.route("/hotel/edit/:id").post(admin.editHotelHandler);

// quản lý manage


module.exports = router;