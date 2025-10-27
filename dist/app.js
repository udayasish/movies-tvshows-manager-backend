"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const entry_routes_1 = __importDefault(require("./routes/entry.routes"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json({
    limit: "16kb",
}));
app.use(express_1.default.urlencoded({
    limit: "16kb",
    extended: true,
}));
app.use(express_1.default.static("public"));
app.use("/api/entries", entry_routes_1.default);
