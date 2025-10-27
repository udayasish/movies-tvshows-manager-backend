"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.searchSchema = exports.paginationSchema = exports.updateEntrySchema = exports.createEntrySchema = exports.EntryTypeEnum = void 0;
const zod_1 = require("zod");
// Enum for entry type matching Prisma schema
exports.EntryTypeEnum = zod_1.z.enum(["MOVIE", "TV_SHOW"], {
    errorMap: () => ({ message: "Type must be either MOVIE or TV_SHOW" }),
});
// Schema for creating a new entry (all fields required)
exports.createEntrySchema = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    })
        .min(1, "Title cannot be empty")
        .max(200, "Title cannot exceed 200 characters")
        .trim(),
    type: exports.EntryTypeEnum,
    director: zod_1.z
        .string({
        required_error: "Director is required",
        invalid_type_error: "Director must be a string",
    })
        .min(1, "Director cannot be empty")
        .max(100, "Director cannot exceed 100 characters")
        .trim(),
    budget: zod_1.z
        .number({
        required_error: "Budget is required",
        invalid_type_error: "Budget must be a number",
    })
        .positive("Budget must be a positive number")
        .finite("Budget must be a finite number"),
    location: zod_1.z
        .string({
        required_error: "Location is required",
        invalid_type_error: "Location must be a string",
    })
        .min(1, "Location cannot be empty")
        .max(100, "Location cannot exceed 100 characters")
        .trim(),
    duration: zod_1.z
        .number({
        required_error: "Duration is required",
        invalid_type_error: "Duration must be a number",
    })
        .int("Duration must be an integer")
        .positive("Duration must be a positive number"),
    yearTime: zod_1.z
        .string({
        required_error: "Year/Time is required",
        invalid_type_error: "Year/Time must be a string",
    })
        .min(1, "Year/Time cannot be empty")
        .max(50, "Year/Time cannot exceed 50 characters")
        .trim(),
});
// Schema for updating an entry (all fields optional for partial updates)
exports.updateEntrySchema = zod_1.z
    .object({
    title: zod_1.z
        .string({
        invalid_type_error: "Title must be a string",
    })
        .min(1, "Title cannot be empty")
        .max(200, "Title cannot exceed 200 characters")
        .trim()
        .optional(),
    type: exports.EntryTypeEnum.optional(),
    director: zod_1.z
        .string({
        invalid_type_error: "Director must be a string",
    })
        .min(1, "Director cannot be empty")
        .max(100, "Director cannot exceed 100 characters")
        .trim()
        .optional(),
    budget: zod_1.z
        .number({
        invalid_type_error: "Budget must be a number",
    })
        .positive("Budget must be a positive number")
        .finite("Budget must be a finite number")
        .optional(),
    location: zod_1.z
        .string({
        invalid_type_error: "Location must be a string",
    })
        .min(1, "Location cannot be empty")
        .max(100, "Location cannot exceed 100 characters")
        .trim()
        .optional(),
    duration: zod_1.z
        .number({
        invalid_type_error: "Duration must be a number",
    })
        .int("Duration must be an integer")
        .positive("Duration must be a positive number")
        .optional(),
    yearTime: zod_1.z
        .string({
        invalid_type_error: "Year/Time must be a string",
    })
        .min(1, "Year/Time cannot be empty")
        .max(50, "Year/Time cannot exceed 50 characters")
        .trim()
        .optional(),
})
    .strict()
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
});
// Schema for pagination query parameters
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z
        .string()
        .optional()
        .default("1")
        .transform((val) => parseInt(val, 10))
        .refine((val) => val > 0, {
        message: "Page must be greater than 0",
    }),
    limit: zod_1.z
        .string()
        .optional()
        .default("10")
        .transform((val) => parseInt(val, 10))
        .refine((val) => val > 0 && val <= 100, {
        message: "Limit must be between 1 and 100",
    }),
});
// Schema for search query parameter
exports.searchSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: "Title query parameter is required",
        invalid_type_error: "Title must be a string",
    })
        .min(1, "Search title cannot be empty")
        .trim(),
    page: zod_1.z
        .string()
        .optional()
        .default("1")
        .transform((val) => parseInt(val, 10))
        .refine((val) => val > 0, {
        message: "Page must be greater than 0",
    }),
    limit: zod_1.z
        .string()
        .optional()
        .default("10")
        .transform((val) => parseInt(val, 10))
        .refine((val) => val > 0 && val <= 100, {
        message: "Limit must be between 1 and 100",
    }),
});
// Schema for validating ID in URL params
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val) && val > 0, {
        message: "ID must be a valid positive integer",
    }),
});
