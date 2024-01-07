const { Service } = require("../models/index");

class ServiceRepository {
    // Hàm xây dựng khởi tạo
    constructor() {}

    async selectAll() {
        try {
            const query = Service.find();
                // execute: thực thi
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }

    async select(filter) {
        try {
            // lọc ra 1 list theo yêu cầu
            const query = Service.find(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            // lọc 1 thằng theo yêu cầu
            const query = Service.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            // lọc 1 thằng theo id 
            const query = Service.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await Service.create(data);
        } catch (err) {
            console.log(err);
        }
    }

    async updateOne(id, data) {
        try {
            return await Service.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    
    async update(filter, data) {
        try {
            return await Service.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await Service.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
        }
    }
    async deleteMany(filter) {
        try {
            return await Service.deleteMany(filter);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { ServiceRepository };