const generateResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
};

module.exports = {generateResponse};