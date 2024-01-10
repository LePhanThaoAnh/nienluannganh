const express = require("express");
const multer = require("multer");
const { ManagerController }  = require("../controllers/manager");

const router = express.Router();
const upload = multer();

let manager = new ManagerController();

// quản lý phòng
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
router.route("/room/delete/:id").get(manager.deleteRoomHandler);
router.route("/room/detail/:id").get(manager.roomDetail);
router.route("/room").get(manager.room);

// quản lý sự kiện khuyến mãi
router.route("/event/add").get(manager.addEvent);
router.route("/event/add-handler").post(manager.addEventHandler);
router.route("/event/edit-handler/:id").post(manager.editEventHandler);
router.route("/event/edit/:id").get(manager.editEvent);
router.route("/event/delete/:id").get(manager.deleteEventHandler);
router.route("/event").get(manager.event);


// quản lý nhân viên
router.route("/user/employee/add-handler").post(manager.addEmployeeHandler);
router.route("/user/employee/add").get(manager.addEmployee);
router.route("/user/employee/edit-handler/:id").post(manager.editEmployeeHandler);
router.route("/user/employee/edit/:id").get(manager.editEmployee);
router.route("/user/employee/delete/:id").get(manager.deleteEmployeeHandler);
router.route("/user/employee").get(manager.employee);

// quản lý khách hàng
router.route("/user/customer/add-handler").post(manager.addCustomerHandler);
router.route("/user/customer/add").get(manager.addCustomer);
router.route("/user/customer/edit-handler/:id").post(manager.editCustomerHandler);
router.route("/user/customer/edit/:id").get(manager.editCustomer);
router.route("/user/customer/delete/:id").get(manager.deleteCustomerHandler);
router.route("/user/customer").get(manager.customer);

//quản lý đặt phòng
router.route("/booking").get(manager.booking);


module.exports = router;