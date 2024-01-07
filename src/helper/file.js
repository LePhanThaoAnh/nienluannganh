const fs = require("fs");
const path = require("path");
module.exports = (data, mimetype) => {
    let dir = path.join(__dirname, "..", "public", "uploads");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    let extendFile = mimetype.split("/")[1];

    let fileName = new Date().getTime().toString() + "." + extendFile;
    fs.writeFileSync(path.join(dir, fileName), data);
    return fileName;
};
