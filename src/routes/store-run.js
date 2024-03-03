const express = require("express");
const multer = require("multer");
const { StoreRunController }  = require("../controllers/store-run");

const router = express.Router();
const upload = multer();

let storeRun = new StoreRunController();
// để hiện tất cả người dùng đánh giá ra màn hình
router.route("/blog").get(storeRun.blog).post(storeRun.blog);
// Chuyển qua trang cho phép 1 người dùng đánh giá
router.route("/review/:bookingId").get(storeRun.review).post(storeRun.review);
router.route("/review_handler/:bookingId").post(storeRun.reviewHandler);
router.route("/contact").get(storeRun.contact).post(storeRun.contact);
router.route("/hotel").get(storeRun.hotel).post(storeRun.hotel);
router.route("/services").get(storeRun.services).post(storeRun.services);
//Show cái trang booking ra
router.route("/booking-show/:id").get(storeRun.booking).post(storeRun.booking);
//Xử lý việc booking
router.route("/booking-room").post(storeRun.bookingHandler);

//Hiện trang room
router.route("/room").get(storeRun.room).post(storeRun.room);
router.route("/room/:id").get(storeRun.roomDetail).post(storeRun.roomDetail);
router.route("/log-out").get(storeRun.logout);

router.route("/historical-booking").get(storeRun.historicalBooking).post(storeRun.historicalBooking);
router.route("/").get(storeRun.homepage).post(storeRun.homepage);


module.exports = router;