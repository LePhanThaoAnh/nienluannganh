const express = require("express");
const multer = require("multer");
const { ManagerController }  = require("../controllers/manager");

const router = express.Router();
const upload = multer();

let manager = new ManagerController();


router.route("/room/add-handler").post(upload.fields([
    {
        name:"hinhanh"
    }
]) ,manager.addRoomHandler);
router.route("/room/add").get(manager.addRoom);
router.route("/room/edit-handler/:id").post(upload.fields([
    {
        name:"hinhanh"
    }
]) ,manager.editRoomHandler);
router.route("/room/edit/:id").get(manager.editRoom);
router.route("/room").get(manager.room);


module.exports = router;