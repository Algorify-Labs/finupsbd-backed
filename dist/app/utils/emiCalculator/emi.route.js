"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicRouter = void 0;
const express_1 = __importDefault(require("express"));
const emi_controller_1 = require("./emi.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const emi_validation_1 = __importDefault(require("./emi.validation"));
const router = express_1.default.Router();
router.post('/emi-calculator', (0, validateRequest_1.default)(emi_validation_1.default), emi_controller_1.PublicController.emiCalculator);
exports.PublicRouter = router;
