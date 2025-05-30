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
const app_1 = require("../../app");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../config");
const generateUserId_1 = require("../utils/generateUserId");
const superUser = {
    name: 'Md Rasel',
    userId: "",
    email: config_1.ConfigFile.SUPER_ADMIN_EMAIL,
    phone: '01719185563',
    password: config_1.ConfigFile.SUPER_ADMIN_PASSWORD,
    role: 'SUPER_ADMIN',
    emailVerified: true,
};
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        superUser.userId = yield (0, generateUserId_1.generateUserId)();
        const passwordHash = yield bcrypt_1.default.hash(config_1.ConfigFile.SUPER_ADMIN_PASSWORD, Number(config_1.ConfigFile.BCRYPT_SALT_ROUNDS));
        superUser.password = passwordHash;
        const isSuperAdmin = yield app_1.prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
        if (!isSuperAdmin) {
            yield app_1.prisma.user.create({ data: superUser });
        }
    }
    catch (error) {
        console.log(`Super admin create fil ${error}`);
    }
});
exports.default = seedSuperAdmin;
