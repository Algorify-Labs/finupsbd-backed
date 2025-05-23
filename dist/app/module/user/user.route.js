"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)('USER', 'ADMIN', 'SUPER_ADMIN'), user_controller_1.UserController.getAllUsers);
router.get('/my-profile', (0, auth_1.default)('USER', 'ADMIN', 'SUPER_ADMIN'), user_controller_1.UserController.meProfile);
router.get('/:id', (0, auth_1.default)('USER', 'ADMIN', 'SUPER_ADMIN'), user_controller_1.UserController.getSingleUser);
exports.UserRouter = router;
