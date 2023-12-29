module.exports = (customMessage, message) => {
    let msg = {
        message: message.message,
        type: message.type,
    };
    msg.message = msg.message.replace("{1}", customMessage);
    return msg;
};
