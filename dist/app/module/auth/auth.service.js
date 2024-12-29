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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const app_1 = require("../../../app");
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield app_1.prisma.user.create({
        data: {
            "name": "shamim Reza",
            "email": "reza1@gmail.com",
            "phone": "01910479167",
            "password": "123456"
        }
    });
    return result;
});
exports.AuthServices = {
    signUp
};
