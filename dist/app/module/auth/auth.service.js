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
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../../../app");
const passwordHash_1 = require("../../utils/passwordHash");
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const tokenGenerate_1 = require("../../utils/tokenGenerate");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../../config");
const generateUserId_1 = require("../../utils/generateUserId");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_codes_1 = require("http-status-codes");
//Sign up User
const signUp = (payload, userSessionInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const isAlreadySignUpRequest = yield app_1.prisma.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    console.log(isAlreadySignUpRequest);
    if (isAlreadySignUpRequest) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'You have already an account please login');
    }
    const { email } = payload;
    payload.password = yield (0, passwordHash_1.passwordHash)(payload.password);
    //   const pin = crypto.randomBytes(3).toString('hex'); // 6-digit PIN
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const pinExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    payload.pin = pin;
    payload.pinExpiry = pinExpiry;
    payload.userId = yield (0, generateUserId_1.generateUserId)();
    const userIsExist = yield app_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (userIsExist) {
        if (userIsExist && userIsExist.emailVerified === false) {
            const sendOtp = yield app_1.prisma.user.update({ where: { email }, data: { pin: pin, pinExpiry: pinExpiry } });
            const MailSubject = 'Your PIN for Verification';
            const MailText = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f4f7fa; border-radius: 8px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; text-align: center; font-size: 24px; margin-bottom: 20px;">Your Verification PIN Code</h2>
        <p style="font-size: 16px; color: #555;">Hello ${userIsExist === null || userIsExist === void 0 ? void 0 : userIsExist.name}</p>
        <p style="font-size: 16px; color: #555;">Your PIN code for verification is:</p>
        <h2 style="color: #007BFF; font-size: 36px; font-weight: bold; text-align: center; margin: 20px 0;">${sendOtp.pin}</h2>
        <p style="font-size: 16px; color: #555;"><strong>🔒 Security Note:</strong> This PIN is valid for <strong>15 minutes</strong> only. Please do not share it with anyone.</p>
        <p style="font-size: 16px; color: #555;">If you did not request this PIN, please ignore this email or contact our support team immediately.</p>
        <p style="font-size: 16px; color: #555;">Thank you,</p>
        <p style="font-size: 16px; color: #555; font-weight: bold;">PinUpsDB</p>
      </div>
    </div>
  `;
            yield (0, sendEmail_1.default)(payload === null || payload === void 0 ? void 0 : payload.email, MailSubject, MailText);
            // phoneOtpSend(phone, "send message")
            throw new AppError_1.default(200, 'Check your email for verification PIN thank you');
        }
        if (userIsExist.emailVerified) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'You have already verified user. Please login thank you');
        }
    }
    const result = yield app_1.prisma.user.create({ data: payload });
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
    // phoneOtpSend(phone, "send message")
    return {
        email: result.email
    };
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email } = payload;
    const user = yield app_1.prisma.user.findUnique({
        where: { email },
        include: {
            profile: true
        }
    });
    if (!user) {
        throw new AppError_1.default(404, 'We can’t find an account with those details, please register your account!');
    }
    // if (!user.emailVerified) {
    //   throw new AppError(500,
    //     'Your email is not verified. Please verify your email before logging in.'
    //   );
    // }
    if (!(user === null || user === void 0 ? void 0 : user.isActive)) {
        throw new AppError_1.default(400, 'Your account is inactive. Please contact support.');
    }
    const passwordCompare = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!passwordCompare) {
        throw new AppError_1.default(400, 'Invalid password! please input valid password.');
    }
    const jwtPayload = {
        name: user === null || user === void 0 ? void 0 : user.name,
        avater: (_a = user === null || user === void 0 ? void 0 : user.profile) === null || _a === void 0 ? void 0 : _a.avatar,
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
        email: user === null || user === void 0 ? void 0 : user.email,
    };
    const accessToken = (0, tokenGenerate_1.accessTokenGenerate)(jwtPayload, '30d');
    const refreshToken = (0, tokenGenerate_1.refreshTokenGenerate)(jwtPayload, '365d');
    yield app_1.prisma.user.update({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        data: {
            lastLogin: new Date(),
        },
    }); // last login tracking
    return {
        accessToken,
        refreshToken,
    };
});
const validatePin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, pin } = payload;
    console.log(email, pin);
    const user = yield app_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError_1.default(400, 'User not found');
    }
    const currentTime = new Date();
    if ((user === null || user === void 0 ? void 0 : user.pinExpiry) && (user === null || user === void 0 ? void 0 : user.pinExpiry) < currentTime) {
        throw new AppError_1.default(400, 'PIN has expired');
    }
    if ((user === null || user === void 0 ? void 0 : user.pin) !== pin) {
        throw new AppError_1.default(400, 'Invalid PIN');
        // return { success: false, message: 'Invalid PIN' };
    }
    yield app_1.prisma.user.update({
        where: { email },
        data: { emailVerified: true },
    });
    const emailSubject = 'Your PIN for Verification';
    const bodyText = `
   <head>
    <style>
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #333;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .email-container {
        width: 100%;
        background-color: #f4f4f4;
        padding: 20px 0;
        animation: fadeIn 0.8s ease-out;
      }
      .email-content {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 40px;
        border-radius: 8px;
        border-top: 4px solid #28a745;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        animation: fadeIn 0.8s ease-out 0.2s both;
      }
      .email-header {
        text-align: center;
        padding-bottom: 20px;
      }
      .email-header h2 {
        color: #28a745;
        font-size: 28px;
        margin: 0;
      }
      .email-body {
        font-size: 16px;
        line-height: 1.6;
        color: #333;
      }
      .cta-button {
        display: inline-block;
        background-color: #28a745;
        color: #ffffff;
        padding: 12px 24px;
        text-decoration: none;
        font-size: 16px;
        border-radius: 4px;
        margin-top: 20px;
        transition: background-color 0.3s ease;
      }
      .cta-button:hover {
        background-color: #218838;
      }
      .footer {
        text-align: center;
        padding-top: 30px;
        font-size: 12px;
        color: #777;
      }
      .footer a {
        color: #28a745;
        text-decoration: none;
      }
      .social-icons img {
        width: 24px;
        margin: 0 10px;
        opacity: 0.8;
        transition: opacity 0.3s ease;
      }
      .social-icons img:hover {
        opacity: 1;
      }
      @media (max-width: 600px) {
        .email-content {
          padding: 20px;
        }
        .email-header h2 {
          font-size: 24px;
        }
      }
    </style>
  </head>
  <body>
    <table role="presentation" class="email-container">
      <tr>
        <td align="center">
          <table role="presentation" class="email-content">
            <tr class="email-header">
              <td>
                <!-- You can swap this for your actual logo if you wish -->
                <h2>Welcome to FinupsBd, ${user.name}!</h2>
              </td>
            </tr>
            <tr class="email-body">
              <td>
                <p>Dear ${user.name},</p>
                <p><strong>UserID:</strong> ${user.userId}</p>
                <p>Thank you for joining <strong>FinupsBd</strong>! We’re thrilled to have you as part of our community.</p>
                <p>At FinupsBd, our goal is to provide top-notch services and a seamless experience. Our team is here to guide you every step of the way.</p>
                <p>To get started, explore our platform, and if you need assistance, don’t hesitate to reach out to our support team.</p>
                <a href="https://www.finupsbd.com/" class="cta-button">Visit Website</a>
              </td>
            </tr>
            <tr class="footer">
              <td>
                <p>&copy; ${new Date().getFullYear()} FinupsBd. All rights reserved.</p>
                <p>Shimultoly, Gazipur</p>
                <div class="social-icons">
                  <a href="https://facebook.com/finupsbd"><img src="facebook-icon.png" alt="Facebook"></a>
                  <a href="https://twitter.com/finupsbd"><img src="twitter-icon.png" alt="Twitter"></a>
                  <a href="https://linkedin.com/company/finupsbd"><img src="linkedin-icon.png" alt="LinkedIn"></a>
                </div>
                <p><a href="https://finupsbd.com/unsubscribe">Unsubscribe</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
`;
    yield (0, sendEmail_1.default)(email, emailSubject, bodyText);
    return {};
});
const forgetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const user = yield app_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError_1.default(404, 'User not found! Please provide valid email !');
    }
    if (!user.emailVerified) {
        throw new AppError_1.default(502, 'Your email is not verified. Please verify your email');
    }
    if (!(user === null || user === void 0 ? void 0 : user.isActive)) {
        throw new AppError_1.default(502, 'Your account is inactive. Please contact support.');
    }
    const jwtPayload = {
        email: user.email,
    };
    const token = (0, tokenGenerate_1.accessTokenGenerate)(jwtPayload, '1h');
    const passwordresetLink = `${config_1.ConfigFile.CLIENT_URL}/auth/reset-password?token=${token}&email=${user === null || user === void 0 ? void 0 : user.email}`;
    const emailSubject = 'Your Reset Password Link';
    const bodyHtml = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 40px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <!-- Header -->
    <div style="background-color: #28a745; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Password Reset Request</h1>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Hi ${user.name},</p>
      <p style="font-size: 16px; color: #555; margin-bottom: 30px;">
        We received a request to reset your password. Click the button below to choose a new password. This link will expire in 1 hour.
      </p>

      <div style="text-align: center; margin-bottom: 30px;">
        <a
          href="${passwordresetLink}"
          style="
            display: inline-block;
            background-color: #28a745;
            color: #ffffff;
            text-decoration: none;
            padding: 15px 25px;
            border-radius: 4px;
            font-size: 18px;
          "
          target="_blank"
        >
          Reset Password
        </a>
      </div>

      <p style="font-size: 14px; color: #777; margin-bottom: 20px;">
        If you didn’t ask to reset your password, just ignore this email. No changes were made to your account.
      </p>
      <p style="font-size: 16px; color: #555;">Thanks,</p>
      <p style="font-size: 16px; color: #555; font-weight: bold;">finupsBD Team</p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f0f0f0; padding: 15px; text-align: center;">
      <p style="font-size: 14px; color: #777; margin: 0;">&copy; ${new Date().getFullYear()} finupsBD. All rights reserved.</p>
    </div>
  </div>
</div>

`;
    yield (0, sendEmail_1.default)(email, emailSubject, bodyHtml);
    return {};
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = payload;
    const user = yield app_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    if (!user.emailVerified) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY, 'Your email was not verifyed. Please verify your email before reset your password');
    }
    if (!(user === null || user === void 0 ? void 0 : user.isActive)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY, 'Your account is inactive. Please contact support.');
    }
    const passwordHashing = yield (0, passwordHash_1.passwordHash)(newPassword);
    yield app_1.prisma.user.update({
        where: { email },
        data: { password: passwordHashing },
    });
    return {};
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!token) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are unauthorized');
    }
    const decode = (yield jsonwebtoken_1.default.verify(token, config_1.ConfigFile.JWT_REFRESH_SECRET));
    const user = yield app_1.prisma.user.findUnique({
        where: { email: decode.email },
        include: {
            profile: true,
        }
    });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User Not Found');
    }
    if (!(user === null || user === void 0 ? void 0 : user.isActive)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'You are not a valid user');
    }
    if (!(user === null || user === void 0 ? void 0 : user.emailVerified)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY, 'You are not valid user');
    }
    const jwtPayload = {
        name: user === null || user === void 0 ? void 0 : user.name,
        avater: (_a = user === null || user === void 0 ? void 0 : user.profile) === null || _a === void 0 ? void 0 : _a.avatar,
        userId: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
        email: user === null || user === void 0 ? void 0 : user.email,
    };
    const accessToken = (0, tokenGenerate_1.accessTokenGenerate)(jwtPayload, '1d');
    return {
        accessToken,
    };
});
const changePassword = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    // const userData = await prisma.user.findUnique({ where: { email } });
    // if (!user) {
    //   throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    // }
    // //   if (!user.emailVerified) {
    // //     throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY,
    // //       'Your email is not verified. Please verify your email before reset your password'
    // //     );
    // //   }
    // if (user?.isActive) {
    //   throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY, 'Your account is inactive. Please contact support.');
    // }
    // const passwordHashing = await passwordHash(payload?.newPassword);
    // if (!userData?.password) {
    //   throw new AppError(StatusCodes.BAD_REQUEST, 'User password not found');
    // }
    // const checkPassword = await comparePassword(payload.oldPassword, userData.password);
    // if (!checkPassword) {
    //   throw new AppError(StatusCodes.NOT_FOUND, 'Please Provide valid password');
    // }
    // await prisma.user.update({
    //   where: { email },
    //   data: { password: passwordHashing },
    // });
    // const emailSubject = 'Password Changed';
    // const bodyText = `
    //   <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f4f7fa; border-radius: 8px;">
    //   <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
    //     <h2 style="color: #333; text-align: center; font-size: 28px; margin-bottom: 20px; font-weight: bold;">Your Password Has Been Changed</h2>
    //     <p style="font-size: 16px; color: #555; text-align: center;">Hello ${user?.name},</p>
    //     <p style="font-size: 16px; color: #555; margin-bottom: 20px;">We wanted to let you know that your password has been successfully updated. If you initiated this change, no further action is required.</p>
    //     <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd; margin-bottom: 20px;">
    //       <p style="font-size: 16px; color: #555; font-weight: bold;">Important Security Information:</p>
    //       <ul style="font-size: 14px; color: #555; padding-left: 20px;">
    //         <li style="margin-bottom: 8px;">If you did not request this change, please reset your password immediately.</li>
    //         <li style="margin-bottom: 8px;">Check your account activity for any unusual behavior.</li>
    //         <li style="margin-bottom: 8px;">For further assistance, contact our support team at <a href="mailto:support@pinupsdb.com" style="color: #007BFF;">support@pinupsdb.com</a>.</li>
    //       </ul>
    //     </div>
    //     <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 30px;">Your security is our top priority. We take every measure to ensure your account remains protected.</p>
    //     <div style="text-align: center;">
    //       <p style="font-size: 16px; color: #555;">Thank you for using PinUpsDB!</p>
    //       <p style="font-size: 16px; color: #555; font-weight: bold;">The PinUpsDB Team</p>
    //     </div>
    //     <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #aaa;">
    //       <p>If you did not request this change, please ignore this email. This message was sent automatically, and you do not need to reply.</p>
    //     </div>
    //   </div>
    // </div>
    // `;
    // await sendEmail(email, emailSubject, bodyText);
    // return {};
});
exports.AuthServices = {
    signUp,
    validatePin,
    login,
    forgetPassword,
    resetPassword,
    refreshToken,
    changePassword
};
