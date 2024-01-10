const {UserRepository} = require('../repositories/index');

async function getUserById(id) {
    const userRepo = new UserRepository();
    return await userRepo.selectById(id);
}


module.exports =  getUserById ;