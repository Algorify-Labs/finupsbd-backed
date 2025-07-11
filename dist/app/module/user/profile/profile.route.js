"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRouter = void 0;
const express_1 = __importDefault(require("express"));
const profile_controller_1 = require("./profile.controller");
const auth_1 = __importDefault(require("../../../middleware/auth"));
const sendImageToCloud_1 = require("../../../utils/sendImageToCloud");
const router = express_1.default.Router();
router.post('/', sendImageToCloud_1.upload.single('file'), (0, auth_1.default)("USER", "ADMIN", "SUPER_ADMIN"), profile_controller_1.ProfileController.createProfile);
exports.ProfileRouter = router;
