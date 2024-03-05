const express = require("express");
const multer = require("multer");
const { AdminController }  = require("../controllers/administrator");

const router = express.Router();
const upload = multer();

let admin = new AdminController();

router.route("/hotel/add-handler").post(admin.addHotelHandler);
router.route("/hotel/add").get(admin.addHotel);
router.route("/hotel").get(admin.hotel);
// router.route("/hotel/edit-handler/:id").post(admin.editHotelHandler);
router.route("/hotel/edit/:id").get(admin.editHotel);
// router.route("/hotel/edit/:id").post(admin.editHotelHandler);

// quản lý manage

//quản lý dịch vụ
router.route("/service/add-handler").post(admin.addServiceHandler);
router.route("/service/add").get(admin.addService);
router.route("/service/edit-handler/:id").post(admin.editServiceHandler);
router.route("/service/edit/:id").get(admin.editService);
router.route("/service/delete/:id").get(admin.deleteServiceHandler);
router.route("/service").get(admin.service);

//quản lý lựa chọn
router.route("/selection/add-handler").post(admin.addSelectionHandler);
router.route("/selection/add").get(admin.addSelection);
router.route("/selection/edit-handler/:id").post(admin.editSelectionHandler);
router.route("/selection/edit/:id").get(admin.editSelection);
router.route("/selection/delete/:id").get(admin.deleteSelectionHandler);
router.route("/selection").get(admin.selection);

//quản lý loại phòng
router.route("/type_room/add-handler").post(admin.addTypeRoomHandler);
router.route("/type_room/add").get(admin.addTypeRoom);
router.route("/type_room/edit-handler/:id").post(admin.editTypeRoomHandler);
router.route("/type_room/edit/:id").get(admin.editTypeRoom);
router.route("/type_room/delete/:id").get(admin.deleteTypeRoomHandler);
router.route("/type_room").get(admin.TypeRoom);

module.exports = router;