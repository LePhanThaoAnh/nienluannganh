const { Hotel } = require("../models/index");

class HotelRepository {
    // Hàm xây dựng khởi tạo
    constructor() {}

    async selectAll() {
        try {
            const query = Hotel.find();
                // execute: thực thi
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }

    async select(filter) {
        try {
            // lọc ra 1 list theo yêu cầu
            const query = Hotel.find(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            // lọc 1 thằng theo yêu cầu
            const query = Hotel.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            // lọc 1 thằng theo id 
            const query = Hotel.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await Hotel.create(data);
        } catch (err) {
            console.log(err);
        }
    }

    async updateOne(id, data) {
        try {
            return await Hotel.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    
    async update(filter, data) {
        try {
            return await Hotel.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await Hotel.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
        }
    }
    async deleteMany(filter) {
        try {
            return await Hotel.deleteMany(filter);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { HotelRepository };