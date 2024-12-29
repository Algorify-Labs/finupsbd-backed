"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigFile = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(process.cwd(), '.env')
});
exports.ConfigFile = {
    NODE_ENV: process.env.NODE_ENV,
    post: process.env.PORT,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    NODE_MAILER_EMAIL: process.env.NODE_MAILER_EMAIL,
    NODE_MAILER_PASS: process.env.NODE_MAILER_PASS
};
