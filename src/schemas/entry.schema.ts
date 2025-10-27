import { z } from "zod";

export const entryType = z.enum(["MOVIE", "TV_SHOW"], {
  message: "Type must be either MOVIE or TV_SHOW",
});

export const titleValidation = z
  .string()
  .min(1, { message: "Title cannot be empty" })
  .max(200, { message: "Title cannot exceed 200 characters" })
  .trim();

export const directorValidation = z
  .string()
  .min(1, { message: "Director cannot be empty" })
  .max(100, { message: "Director cannot exceed 100 characters" })
  .trim();

export const budgetValidation = z
  .number({ message: "Budget must be a number" })
  .positive({ message: "Budget must be a positive number" });

export const locationValidation = z
  .string()
  .min(1, { message: "Location cannot be empty" })
  .max(100, { message: "Location cannot exceed 100 characters" })
  .trim();

export const durationValidation = z
  .number({ message: "Duration must be a number" })
  .int({ message: "Duration must be an integer" })
  .positive({ message: "Duration must be a positive number" });

export const yearTimeValidation = z
  .string()
  .min(1, { message: "Year/Time cannot be empty" })
  .max(50, { message: "Year/Time cannot exceed 50 characters" })
  .trim();

export const createEntrySchema = z.object({
  title: titleValidation,
  type: entryType,
  director: directorValidation,
  budget: budgetValidation,
  location: locationValidation,
  duration: durationValidation,
  yearTime: yearTimeValidation,
});

export const updateEntrySchema = z
  .object({
    title: titleValidation.optional(),
    type: entryType.optional(),
    director: directorValidation.optional(),
    budget: budgetValidation.optional(),
    location: locationValidation.optional(),
    duration: durationValidation.optional(),
    yearTime: yearTimeValidation.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform((val) => parseInt(val))
    .refine((val) => val > 0, { message: "Page must be greater than 0" }),

  limit: z
    .string()
    .optional()
    .default("5")
    .transform((val) => parseInt(val))
    .refine((val) => val > 0 && val <= 100, {
      message: "Limit must be between 1 and 20",
    }),
});

export const searchSchema = z.object({
  title: z.string().min(1, { message: "Search title cannot be empty" }).trim(),

  page: z
    .string()
    .optional()
    .default("1")
    .transform((val) => parseInt(val))
    .refine((val) => val > 0, { message: "Page must be greater than 0" }),

  limit: z
    .string()
    .optional()
    .default("10")
    .transform((val) => parseInt(val))
    .refine((val) => val > 0 && val <= 100, {
      message: "Limit must be between 1 and 100",
    }),
});

// Schema for ID param
export const idParamSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "ID must be a valid positive integer",
    }),
});
