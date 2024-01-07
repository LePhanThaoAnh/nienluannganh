const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
    {
        // trim: chuỗi kh được có khoảng cách ở đầu cuối, required bắt buộc
        name: { type: String, trim: true, required: true },
        hotel: { 
            type: mongoose.Schema.Types.ObjectId, 
            autopopulate: true, //giúp đọc luôn dữ liệu của cả bảng chứ không chỉ lấy id
            ref: "hotels",
            required: true 
        },
        discount_percent: { type: Number, trim: true, required: true },       
    },
    { versionKey: false }
);

EventSchema.plugin(require("mongoose-autopopulate"));
const Event = mongoose.model("events", EventSchema);

module.exports = { Event };