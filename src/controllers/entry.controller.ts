import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { prisma } from "../db/index";
import {
  createEntrySchema,
  updateEntrySchema,
  paginationSchema,
  searchSchema,
  idParamSchema,
} from "../schemas/entry.schema";

const createEntry = asyncHandler(async (req, res) => {
  const { title, type, director, budget, location, duration, yearTime } =
    req.body;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  if (!type) {
    throw new ApiError(400, "Type is required");
  }

  if (!director) {
    throw new ApiError(400, "Director is required");
  }

  if (!budget) {
    throw new ApiError(400, "Budget is required");
  }

  if (!location) {
    throw new ApiError(400, "Location is required");
  }

  if (!duration) {
    throw new ApiError(400, "Duration is required");
  }

  if (!yearTime) {
    throw new ApiError(400, "Year/Time is required");
  }

  const validatedData = createEntrySchema.parse(req.body);

  const entry = await prisma.entry.create({
    data: validatedData,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Entry created successfully", entry));
});

const getAllEntries = asyncHandler(async (req, res) => {
  const { page, limit } = paginationSchema.parse(req.query);

  const skip = (page - 1) * limit;

  const entries = await prisma.entry.findMany({
    skip: skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  // WARNING: COUNT() can be slow with large datasets (lakhs/millions of rows)
  // For production with huge data, consider: caching, approximate counts, or removing total count
  const totalCount = await prisma.entry.count();
  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json(
    new ApiResponse(200, "Entries fetched successfully", {
      entries,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    })
  );
});

const getEntryById = asyncHandler(async (req, res) => {
  const { id: idParam } = req.params;

  if (!idParam) {
    throw new ApiError(400, "Entry ID is required");
  }

  const { id } = idParamSchema.parse(req.params);

  const entry = await prisma.entry.findUnique({
    where: { id },
  });

  if (!entry) {
    throw new ApiError(404, "Entry not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Entry fetched successfully", entry));
});

const updateEntry = asyncHandler(async (req, res) => {
  const { id: idParam } = req.params;

  if (!idParam) {
    throw new ApiError(400, "Entry ID is required");
  }

  const { title, type, director, budget, location, duration, yearTime } =
    req.body;

  if (
    !title &&
    !type &&
    !director &&
    budget === undefined &&
    !location &&
    duration === undefined &&
    !yearTime
  ) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const { id } = idParamSchema.parse(req.params);
  const validatedData = updateEntrySchema.parse(req.body);

  const existingEntry = await prisma.entry.findUnique({
    where: { id },
  });

  if (!existingEntry) {
    throw new ApiError(404, "Entry not found");
  }

  const updatedEntry = await prisma.entry.update({
    where: { id },
    data: validatedData,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Entry updated successfully", updatedEntry));
});

const deleteEntry = asyncHandler(async (req, res) => {
  const { id: idParam } = req.params;

  if (!idParam) {
    throw new ApiError(400, "Entry ID is required");
  }

  const { id } = idParamSchema.parse(req.params);

  const existingEntry = await prisma.entry.findUnique({
    where: { id },
  });

  if (!existingEntry) {
    throw new ApiError(404, "Entry not found");
  }

  await prisma.entry.delete({
    where: { id },
  });

  res.status(200).json(new ApiResponse(200, "Entry deleted successfully"));
});

const searchEntries = asyncHandler(async (req, res) => {
  const { title: searchTitle } = req.query;

  if (!searchTitle) {
    throw new ApiError(400, "Search title is required");
  }

  const { title, page, limit } = searchSchema.parse(req.query);

  const skip = (page - 1) * limit;

  const entries = await prisma.entry.findMany({
    where: {
      title: {
        contains: title,
      },
    },
    skip: skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  // WARNING: COUNT() can be slow with large datasets (lakhs/millions of rows)
  // For production with huge data, consider: caching, approximate counts, or removing total count
  const totalCount = await prisma.entry.count({
    where: {
      title: {
        contains: title,
      },
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json(
    new ApiResponse(200, "Search results fetched successfully", {
      entries,
      searchQuery: title,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    })
  );
});

export {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
  searchEntries,
};
