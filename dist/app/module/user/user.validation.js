"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email format').min(1, 'Email is required'),
    phone: zod_1.z
        .string()
        .min(1, 'Phone is required')
        .regex(/^\d{11}$/, 'Phone number must be 11 digits'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
});
exports.UserValidation = {
    createUserValidationSchema
};
