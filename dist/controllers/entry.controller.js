"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchEntries = exports.deleteEntry = exports.updateEntry = exports.getEntryById = exports.getAllEntries = exports.createEntry = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const index_1 = require("../db/index");
const entry_schema_1 = require("../schemas/entry.schema");
const createEntry = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { title, type, director, budget, location, duration, yearTime } = req.body;
    if (!title) {
        throw new ApiError_1.ApiError(400, "Title is required");
    }
    if (!type) {
        throw new ApiError_1.ApiError(400, "Type is required");
    }
    if (!director) {
        throw new ApiError_1.ApiError(400, "Director is required");
    }
    if (!budget) {
        throw new ApiError_1.ApiError(400, "Budget is required");
    }
    if (!location) {
        throw new ApiError_1.ApiError(400, "Location is required");
    }
    if (!duration) {
        throw new ApiError_1.ApiError(400, "Duration is required");
    }
    if (!yearTime) {
        throw new ApiError_1.ApiError(400, "Year/Time is required");
    }
    const validatedData = entry_schema_1.createEntrySchema.parse(req.body);
    const entry = await index_1.prisma.entry.create({
        data: validatedData,
    });
    res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(201, "Entry created successfully", entry));
});
exports.createEntry = createEntry;
const getAllEntries = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { page, limit } = entry_schema_1.paginationSchema.parse(req.query);
    const skip = (page - 1) * limit;
    const entries = await index_1.prisma.entry.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
    // WARNING: COUNT() can be slow with large datasets (lakhs/millions of rows)
    // For production with huge data, consider: caching, approximate counts, or removing total count
    const totalCount = await index_1.prisma.entry.count();
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json(new ApiResponse_1.ApiResponse(200, "Entries fetched successfully", {
        entries,
        pagination: {
            currentPage: page,
            totalPages,
            totalCount,
            limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    }));
});
exports.getAllEntries = getAllEntries;
const getEntryById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id: idParam } = req.params;
    if (!idParam) {
        throw new ApiError_1.ApiError(400, "Entry ID is required");
    }
    const { id } = entry_schema_1.idParamSchema.parse(req.params);
    const entry = await index_1.prisma.entry.findUnique({
        where: { id },
    });
    if (!entry) {
        throw new ApiError_1.ApiError(404, "Entry not found");
    }
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, "Entry fetched successfully", entry));
});
exports.getEntryById = getEntryById;
const updateEntry = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id: idParam } = req.params;
    if (!idParam) {
        throw new ApiError_1.ApiError(400, "Entry ID is required");
    }
    const { title, type, director, budget, location, duration, yearTime } = req.body;
    if (!title &&
        !type &&
        !director &&
        budget === undefined &&
        !location &&
        duration === undefined &&
        !yearTime) {
        throw new ApiError_1.ApiError(400, "At least one field is required to update");
    }
    const { id } = entry_schema_1.idParamSchema.parse(req.params);
    const validatedData = entry_schema_1.updateEntrySchema.parse(req.body);
    const existingEntry = await index_1.prisma.entry.findUnique({
        where: { id },
    });
    if (!existingEntry) {
        throw new ApiError_1.ApiError(404, "Entry not found");
    }
    const updatedEntry = await index_1.prisma.entry.update({
        where: { id },
        data: validatedData,
    });
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, "Entry updated successfully", updatedEntry));
});
exports.updateEntry = updateEntry;
const deleteEntry = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id: idParam } = req.params;
    if (!idParam) {
        throw new ApiError_1.ApiError(400, "Entry ID is required");
    }
    const { id } = entry_schema_1.idParamSchema.parse(req.params);
    const existingEntry = await index_1.prisma.entry.findUnique({
        where: { id },
    });
    if (!existingEntry) {
        throw new ApiError_1.ApiError(404, "Entry not found");
    }
    await index_1.prisma.entry.delete({
        where: { id },
    });
    res.status(200).json(new ApiResponse_1.ApiResponse(200, "Entry deleted successfully"));
});
exports.deleteEntry = deleteEntry;
const searchEntries = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { title: searchTitle } = req.query;
    if (!searchTitle) {
        throw new ApiError_1.ApiError(400, "Search title is required");
    }
    const { title, page, limit } = entry_schema_1.searchSchema.parse(req.query);
    const skip = (page - 1) * limit;
    const entries = await index_1.prisma.entry.findMany({
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
    const totalCount = await index_1.prisma.entry.count({
        where: {
            title: {
                contains: title,
            },
        },
    });
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json(new ApiResponse_1.ApiResponse(200, "Search results fetched successfully", {
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
    }));
});
exports.searchEntries = searchEntries;
