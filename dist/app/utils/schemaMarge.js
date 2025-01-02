"use strict";
// import fs from "fs"
// import path from 'path'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const schemaMarge = () =>{
//     const mainSchemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
//     const moduleSchemaPath = path.join(process.cwd(), 'src', 'app', 'module', 'user', "user.prisma");
//     // Read the main schema and module schema
//     const mainSchema = fs.readFileSync(mainSchemaPath, 'utf-8');
//     const moduleSchema = fs.readFileSync(moduleSchemaPath, 'utf-8');
//     // Combine schemas
//     const mergedSchema = `${mainSchema}\n\n// User Module Schema\n${moduleSchema}`;
//     // Write back to the main schema
//     fs.writeFileSync(mainSchemaPath, mergedSchema, 'utf-8');
//     console.log('Schemas merged successfully!');
// }
// export default schemaMarge
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const schemaMarge = () => {
    try {
        const mainSchemaPath = path_1.default.join(process.cwd(), "prisma", "schema.prisma");
        const moduleSchemasPath = path_1.default.join(process.cwd(), "src", "app", "module");
        // Check if the main schema exists
        if (!fs_1.default.existsSync(mainSchemaPath)) {
            throw new Error(`Main schema file not found at: ${mainSchemaPath}`);
        }
        // Read the main schema
        let mergedSchema = fs_1.default.readFileSync(mainSchemaPath, "utf-8");
        // Get all .prisma files in the module directory
        const moduleFiles = fs_1.default
            .readdirSync(moduleSchemasPath)
            .filter((file) => file.endsWith(".prisma"));
        if (moduleFiles.length === 0) {
            console.warn(`No .prisma files found in: ${moduleSchemasPath}`);
        }
        // Merge each module schema into the main schema
        for (const file of moduleFiles) {
            const moduleSchemaPath = path_1.default.join(moduleSchemasPath, file);
            console.log(`Merging schema: ${moduleSchemaPath}`);
            const moduleSchema = fs_1.default.readFileSync(moduleSchemaPath, "utf-8");
            mergedSchema += `\n\n// ${file} Schema\n${moduleSchema}`;
        }
        // Write the merged schema back to the main schema file
        fs_1.default.writeFileSync(mainSchemaPath, mergedSchema, "utf-8");
        console.log("Schemas merged successfully!");
    }
    catch (error) {
        console.error("Error merging schemas:", error.message);
    }
};
exports.default = schemaMarge;
