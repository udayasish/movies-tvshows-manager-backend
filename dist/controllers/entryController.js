"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchEntries = exports.deleteEntry = exports.updateEntry = exports.getEntryById = exports.getAllEntries = exports.createEntry = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const index_1 = require("../db/index");
// Create new entry (Movie or TV Show)
const createEntry = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { title, type, director, budget, location, duration, yearTime } = req.body;
    // Validate required fields
    if (!title || title.trim() === "") {
        throw new ApiError_1.ApiError(400, "Title is required");
    }
    if (!type) {
        throw new ApiError_1.ApiError(400, "Type is required");
    }
    if (type !== "MOVIE" && type !== "TV_SHOW") {
        throw new ApiError_1.ApiError(400, "Type must be either MOVIE or TV_SHOW");
    }
    if (!director || director.trim() === "") {
        throw new ApiError_1.ApiError(400, "Director is required");
    }
    if (!budget || typeof budget !== "number" || budget <= 0) {
        throw new ApiError_1.ApiError(400, "Budget must be a positive number");
    }
    if (!location || location.trim() === "") {
        throw new ApiError_1.ApiError(400, "Location is required");
    }
    if (!duration || typeof duration !== "number" || duration <= 0) {
        throw new ApiError_1.ApiError(400, "Duration must be a positive number");
    }
    if (!yearTime || yearTime.trim() === "") {
        throw new ApiError_1.ApiError(400, "Year/Time is required");
    }
    // Create entry in database
    const entry = await index_1.prisma.entry.create({
        data: {
            title: title.trim(),
            type,
            director: director.trim(),
            budget,
            location: location.trim(),
            duration,
            yearTime: yearTime.trim(),
        },
    });
    res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(201, "Entry created successfully", entry));
});
exports.createEntry = createEntry;
// Get all entries with pagination
const getAllEntries = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    // Destructure pagination parameters from query
    const { page: pageQuery, limit: limitQuery } = req.query;
    // Parse and validate page number
    const page = pageQuery ? parseInt(pageQuery) : 1;
    if (isNaN(page) || page <= 0) {
        throw new ApiError_1.ApiError(400, "Page must be a positive number");
    }
    // Parse and validate limit
    const limit = limitQuery ? parseInt(limitQuery) : 10;
    if (isNaN(limit) || limit <= 0 || limit > 100) {
        throw new ApiError_1.ApiError(400, "Limit must be between 1 and 100");
    }
    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    // Get entries with pagination
    const entries = await index_1.prisma.entry.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
    // Get total count
    const totalCount = await index_1.prisma.entry.count();
    // Calculate pagination metadata
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
// Get single entry by ID
const getEntryById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    // Destructure ID from params
    const { id: idParam } = req.params;
    // Validate ID
    const id = parseInt(idParam);
    if (isNaN(id) || id <= 0) {
        throw new ApiError_1.ApiError(400, "Invalid entry ID");
    }
    // Find entry
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
// Update entry by ID
const updateEntry = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    // Destructure ID from params
    const { id: idParam } = req.params;
    // Validate ID
    const id = parseInt(idParam);
    if (isNaN(id) || id <= 0) {
        throw new ApiError_1.ApiError(400, "Invalid entry ID");
    }
    // Destructure data from request body
    const { title, type, director, budget, location, duration, yearTime } = req.body;
    // Check if at least one field is provided
    if (!title &&
        !type &&
        !director &&
        budget === undefined &&
        !location &&
        duration === undefined &&
        !yearTime) {
        throw new ApiError_1.ApiError(400, "At least one field must be provided for update");
    }
    // Validate type if provided
    if (type && type !== "MOVIE" && type !== "TV_SHOW") {
        throw new ApiError_1.ApiError(400, "Type must be either MOVIE or TV_SHOW");
    }
    // Validate title if provided
    if (title !== undefined && title.trim() === "") {
        throw new ApiError_1.ApiError(400, "Title cannot be empty");
    }
    // Validate director if provided
    if (director !== undefined && director.trim() === "") {
        throw new ApiError_1.ApiError(400, "Director cannot be empty");
    }
    // Validate budget if provided
    if (budget !== undefined && (typeof budget !== "number" || budget <= 0)) {
        throw new ApiError_1.ApiError(400, "Budget must be a positive number");
    }
    // Validate location if provided
    if (location !== undefined && location.trim() === "") {
        throw new ApiError_1.ApiError(400, "Location cannot be empty");
    }
    // Validate duration if provided
    if (duration !== undefined &&
        (typeof duration !== "number" || duration <= 0)) {
        throw new ApiError_1.ApiError(400, "Duration must be a positive number");
    }
    // Validate yearTime if provided
    if (yearTime !== undefined && yearTime.trim() === "") {
        throw new ApiError_1.ApiError(400, "Year/Time cannot be empty");
    }
    // Check if entry exists
    const existingEntry = await index_1.prisma.entry.findUnique({
        where: { id },
    });
    if (!existingEntry) {
        throw new ApiError_1.ApiError(404, "Entry not found");
    }
    // Prepare update data
    const updateData = {};
    if (title)
        updateData.title = title.trim();
    if (type)
        updateData.type = type;
    if (director)
        updateData.director = director.trim();
    if (budget !== undefined)
        updateData.budget = budget;
    if (location)
        updateData.location = location.trim();
    if (duration !== undefined)
        updateData.duration = duration;
    if (yearTime)
        updateData.yearTime = yearTime.trim();
    // Update entry
    const updatedEntry = await index_1.prisma.entry.update({
        where: { id },
        data: updateData,
    });
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, "Entry updated successfully", updatedEntry));
});
exports.updateEntry = updateEntry;
// Delete entry by ID
const deleteEntry = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    // Destructure ID from params
    const { id: idParam } = req.params;
    // Validate ID
    const id = parseInt(idParam);
    if (isNaN(id) || id <= 0) {
        throw new ApiError_1.ApiError(400, "Invalid entry ID");
    }
    // Check if entry exists
    const existingEntry = await index_1.prisma.entry.findUnique({
        where: { id },
    });
    if (!existingEntry) {
        throw new ApiError_1.ApiError(404, "Entry not found");
    }
    // Delete entry
    await index_1.prisma.entry.delete({
        where: { id },
    });
    res.status(200).json(new ApiResponse_1.ApiResponse(200, "Entry deleted successfully"));
});
exports.deleteEntry = deleteEntry;
// Search entries by title (Bonus feature)
const searchEntries = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    // Destructure search query and pagination parameters
    const { title, page: pageQuery, limit: limitQuery } = req.query;
    // Validate title query
    if (!title || title.trim() === "") {
        throw new ApiError_1.ApiError(400, "Search title is required");
    }
    const searchTitle = title.trim();
    // Parse and validate page number
    const page = pageQuery ? parseInt(pageQuery) : 1;
    if (isNaN(page) || page <= 0) {
        throw new ApiError_1.ApiError(400, "Page must be a positive number");
    }
    // Parse and validate limit
    const limit = limitQuery ? parseInt(limitQuery) : 10;
    if (isNaN(limit) || limit <= 0 || limit > 100) {
        throw new ApiError_1.ApiError(400, "Limit must be between 1 and 100");
    }
    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    // Search entries by title
    const entries = await index_1.prisma.entry.findMany({
        where: {
            title: {
                contains: searchTitle,
            },
        },
        skip: skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
    // Get total count for search results
    const totalCount = await index_1.prisma.entry.count({
        where: {
            title: {
                contains: searchTitle,
            },
        },
    });
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json(new ApiResponse_1.ApiResponse(200, "Search results fetched successfully", {
        entries,
        searchQuery: searchTitle,
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
