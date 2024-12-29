"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const http_status_codes_1 = require("http-status-codes");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    var _a;
    let newMessage = "Something went's wrong";
    let error = err;
    let statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    //Prisma Validation Error handle
    if ((err === null || err === void 0 ? void 0 : err.name) === 'PrismaClientKnownRequestError') {
        newMessage = `Validation Error from (${(_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.modelName}) model `;
        error = err === null || err === void 0 ? void 0 : err.meta;
    }
    //Zod Validation Error handle
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ZodError') {
        newMessage = 'Validation Error';
        error = err === null || err === void 0 ? void 0 : err.issues;
    }
    if (err instanceof Error) {
        newMessage = err === null || err === void 0 ? void 0 : err.message;
        statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        error = err;
    }
    res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
        success: false,
        message: newMessage,
        statusCode: statusCode,
        error: error,
        stack: config_1.ConfigFile.NODE_ENV === 'production' ? null : err.stack,
    });
};
exports.default = globalErrorHandler;
