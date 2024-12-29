"use strict";
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const http_status_codes_1 = require("http-status-codes");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    let newMessage = "Something went's wrong";
    if ((err === null || err === void 0 ? void 0 : err.name) === "PrismaClientKnownRequestError") {
        newMessage = "Validation Error";
    }
    res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
        success: false,
        message: newMessage,
        error: err,
        stack: config_1.ConfigFile.NODE_ENV === "production" ? null : err.stack
    });
};
exports.default = globalErrorHandler;
