"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../module/auth/auth.route");
const router = express_1.default.Router();
const moduleRouter = [
    {
        path: '/auth',
        route: auth_route_1.AuthRouter
    },
];
moduleRouter.forEach(item => router.use(item.path, item.route));
exports.RootRouter = router;
