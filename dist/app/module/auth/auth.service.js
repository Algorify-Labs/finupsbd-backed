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
exports.AuthServices = void 0;
const app_1 = require("../../../app");
const passwordHash_1 = require("../../utils/passwordHash");
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const tokenGenerate_1 = require("../../utils/tokenGenerate");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    payload.password = yield (0, passwordHash_1.passwordHash)(payload.password);
    //   const pin = crypto.randomBytes(3).toString('hex'); // 6-digit PIN
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const pinExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    payload.pin = pin;
    payload.pinExpiry = pinExpiry;
    const result = yield app_1.prisma.user.create({ data: payload });
    console.log(result);
    const MailSubject = 'Your PIN for Verification';
    const MailText = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f4f7fa; border-radius: 8px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333; text-align: center; font-size: 24px; margin-bottom: 20px;">Your Verification PIN Code</h2>
      <p style="font-size: 16px; color: #555;">Hello ${payload === null || payload === void 0 ? void 0 : payload.name}</p>
      <p style="font-size: 16px; color: #555;">Your PIN code for verification is:</p>
      <h2 style="color: #007BFF; font-size: 36px; font-weight: bold; text-align: center; margin: 20px 0;">${result === null || result === void 0 ? void 0 : result.pin}</h2>
      <p style="font-size: 16px; color: #555;"><strong>🔒 Security Note:</strong> This PIN is valid for <strong>15 minutes</strong> only. Please do not share it with anyone.</p>
      <p style="font-size: 16px; color: #555;">If you did not request this PIN, please ignore this email or contact our support team immediately.</p>
      <p style="font-size: 16px; color: #555;">Thank you,</p>
      <p style="font-size: 16px; color: #555; font-weight: bold;">PinUpsDB</p>
    </div>
  </div>
`;
    yield (0, sendEmail_1.default)(payload === null || payload === void 0 ? void 0 : payload.email, MailSubject, MailText);
    return 'Send Your pin Check your email! Thank you';
});
const validatePin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, pin } = payload;
    const user = yield app_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    const currentTime = new Date();
    if ((user === null || user === void 0 ? void 0 : user.pinExpiry) && (user === null || user === void 0 ? void 0 : user.pinExpiry) < currentTime) {
        throw new Error('PIN has expired');
    }
    if ((user === null || user === void 0 ? void 0 : user.pin) !== pin) {
        throw new Error('Invalid PIN');
        // return { success: false, message: 'Invalid PIN' };
    }
    yield app_1.prisma.user.update({
        where: { email },
        data: { emailVerified: true },
    });
    return {};
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const user = yield app_1.prisma.user.findUnique({ where: { email } });
    console.log(user);
    if (!user) {
        throw new Error('User not found');
    }
    if (!user.emailVerified) {
        throw new Error('Your email is not verified. Please verify your email before logging in.');
    }
    if (!(user === null || user === void 0 ? void 0 : user.isActive)) {
        throw new Error('Your account is inactive. Please contact support.');
    }
    const passwordCompare = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!passwordCompare) {
        throw new Error('Invalid password! please input valid password.');
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
        email: user === null || user === void 0 ? void 0 : user.email
    };
    const accessToken = (0, tokenGenerate_1.accessTokenGenerate)(jwtPayload, "1d");
    yield app_1.prisma.user.update({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email
        },
        data: {
            lastLogin: new Date()
        }
    }); // last login tracking
    return {
        accessToken
    };
});
exports.AuthServices = {
    signUp,
    validatePin,
    login,
};
