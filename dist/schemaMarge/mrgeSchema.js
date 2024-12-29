"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// const fs = require('fs');
// const path = require('path');
const schemaFiles = ['./prisma/user.prisma', './prisma/post.prisma'];
const mergedSchema = schemaFiles
    .map((file) => fs_1.default.readFileSync(path_1.default.resolve(__dirname, file), 'utf8'))
    .join('\n');
fs_1.default.writeFileSync('./prisma/schema.prisma', mergedSchema);
console.log('Schema merged successfully!');
