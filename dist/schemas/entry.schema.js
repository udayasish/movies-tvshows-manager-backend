"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.searchSchema = exports.paginationSchema = exports.updateEntrySchema = exports.createEntrySchema = exports.yearTimeValidation = exports.durationValidation = exports.locationValidation = exports.budgetValidation = exports.directorValidation = exports.titleValidation = exports.entryType = void 0;
const zod_1 = require("zod");
exports.entryType = zod_1.z.enum(["MOVIE", "TV_SHOW"], {
    message: "Type must be either MOVIE or TV_SHOW",
});
exports.titleValidation = zod_1.z
    .string()
    .min(1, { message: "Title cannot be empty" })
    .max(200, { message: "Title cannot exceed 200 characters" })
    .trim();
exports.directorValidation = zod_1.z
    .string()
    .min(1, { message: "Director cannot be empty" })
    .max(100, { message: "Director cannot exceed 100 characters" })
    .trim();
exports.budgetValidation = zod_1.z
    .number({ message: "Budget must be a number" })
    .positive({ message: "Budget must be a positive number" });
exports.locationValidation = zod_1.z
    .string()
    .min(1, { message: "Location cannot be empty" })
    .max(100, { message: "Location cannot exceed 100 characters" })
    .trim();
exports.durationValidation = zod_1.z
    .number({ message: "Duration must be a number" })
    .int({ message: "Duration must be an integer" })
    .positive({ message: "Duration must be a positive number" });
exports.yearTimeValidation = zod_1.z
    .string()
    .min(1, { message: "Year/Time cannot be empty" })
    .max(50, { message: "Year/Time cannot exceed 50 characters" })
    .trim();
exports.createEntrySchema = zod_1.z.object({
    title: exports.titleValidation,
    type: exports.entryType,
    director: exports.directorValidation,
    budget: exports.budgetValidation,
    location: exports.locationValidation,
    duration: exports.durationValidation,
    yearTime: exports.yearTimeValidation,
});
exports.updateEntrySchema = zod_1.z
    .object({
    title: exports.titleValidation.optional(),
    type: exports.entryType.optional(),
    director: exports.directorValidation.optional(),
    budget: exports.budgetValidation.optional(),
    location: exports.locationValidation.optional(),
    duration: exports.durationValidation.optional(),
    yearTime: exports.yearTimeValidation.optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
});
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z
        .string()
        .optional()
        .default("1")
        .transform((val) => parseInt(val))
        .refine((val) => val > 0, { message: "Page must be greater than 0" }),
    limit: zod_1.z
        .string()
        .optional()
        .default("5")
        .transform((val) => parseInt(val))
        .refine((val) => val > 0 && val <= 100, {
        message: "Limit must be between 1 and 20",
    }),
});
exports.searchSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Search title cannot be empty" }).trim(),
    page: zod_1.z
        .string()
        .optional()
        .default("1")
        .transform((val) => parseInt(val))
        .refine((val) => val > 0, { message: "Page must be greater than 0" }),
    limit: zod_1.z
        .string()
        .optional()
        .default("10")
        .transform((val) => parseInt(val))
        .refine((val) => val > 0 && val <= 100, {
        message: "Limit must be between 1 and 100",
    }),
});
// Schema for ID param
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .transform((val) => parseInt(val))
        .refine((val) => !isNaN(val) && val > 0, {
        message: "ID must be a valid positive integer",
    }),
});
