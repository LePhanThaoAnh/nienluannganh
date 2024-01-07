const { Role } = require("../models/index");

class RoleRepository {
    // Hàm xây dựng khởi tạo
    constructor() {}

    async selectAll() {
        try {
            const query = Role.find();
                // execute: thực thi
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }

    async select(filter) {
        try {
            // lọc ra 1 list theo yêu cầu
            const query = Role.find(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            // lọc 1 thằng theo yêu cầu
            const query = Role.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            // lọc 1 thằng theo id 
            const query = Role.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await Role.create(data);
        } catch (err) {
            console.log(err);
        }
    }

    async updateOne(id, data) {
        try {
            return await Role.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }
    
    async update(filter, data) {
        try {
            return await Role.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await Role.deleteOne({ _id: id });
        } catch (err) {
            console.log(err);
        }
    }
    async deleteMany(filter) {
        try {
            return await Role.deleteMany(filter);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { RoleRepository };