const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        rating: { type: Number, trim: true, required: true },
        comment: { type: String, trim: true, required: true },
        customer: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "user",
            required: true 
        },
        booking: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "bookings",
            required: true 
        },
        room: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "rooms",
            required: true 
        },
    },
    { versionKey: false }
);


ReviewSchema.plugin(require("mongoose-autopopulate"));
const Review = mongoose.model("reviews", ReviewSchema);

module.exports = { Review };