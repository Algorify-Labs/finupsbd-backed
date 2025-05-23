"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.passwordHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../config");
const passwordHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(password);
    const result = yield bcrypt_1.default.hash(password, Number(config_1.ConfigFile.BCRYPT_SALT_ROUNDS));
    return result;
});
exports.passwordHash = passwordHash;
const comparePassword = (myPlaintextPassword, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt_1.default.compare(myPlaintextPassword, hashPassword);
    return result;
});
exports.comparePassword = comparePassword;
