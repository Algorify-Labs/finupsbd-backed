"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const http_status_codes_1 = require("http-status-codes");
const globalErrorHandler = (err, req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
        success: false,
        message: "Something went's wrong",
        error: err,
        stack: config_1.ConfigFile.NODE_ENV === "production" ? null : err.stack
    });
};
exports.default = globalErrorHandler;
