"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./db/index"));
const app_1 = require("./app");
(0, index_1.default)()
    .then(() => {
    const server = app_1.app.listen(process.env.PORT || 8000, () => {
        console.log(`App is listening on port: ${process.env.PORT || 8000}`);
    });
    // Handle server errors
    server.on("error", (error) => {
        console.log("Error while listening !!!", error);
        throw error;
    });
})
    .catch((error) => {
    console.log("MySQL Connection Failed !!!! ", error);
});
