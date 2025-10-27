"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema, source = "body") => {
    return async (req, res, next) => {
        try {
            const dataToValidate = req[source];
            const validatedData = await schema.parseAsync(dataToValidate);
            req[source] = validatedData;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const formattedErrors = error.errors.map((err) => {
                    const field = err.path.join(".");
                    return `${field}: ${err.message}`;
                });
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: formattedErrors,
                });
            }
            next(error);
        }
    };
};
exports.validate = validate;
