"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponses = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: data === null || data === void 0 ? void 0 : data.success,
        message: data === null || data === void 0 ? void 0 : data.message,
        statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
        data: data === null || data === void 0 ? void 0 : data.data,
    });
};
exports.default = sendResponses;
