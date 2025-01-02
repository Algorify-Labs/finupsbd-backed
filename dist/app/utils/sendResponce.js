"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponce = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        success: true,
        message: message,
        statusCode: statusCode,
        data: data
    });
};
exports.default = sendResponce;
