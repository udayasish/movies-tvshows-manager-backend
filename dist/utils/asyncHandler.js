"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next);
        }
        catch (error) {
            res.status(error.code || 500).json({
                success: false,
                message: error.message || "Internal Server Error",
            });
        }
    };
};
exports.asyncHandler = asyncHandler;
