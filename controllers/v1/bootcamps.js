import asyncHandler from "express-async-handler"

import Bootcamp from "../../models/Bootcamp.js"
import geocoder from "../../utils/geocoder.js";


// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getAllBootcamps = asyncHandler(async (req, res) => {
    let query;

    // copy req.query
    const reqQuery = { ...req.query };

    // fields to exclude from the search
    const removeFields = ['select','sort'];

    // loop over removeFields & delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // create query string
    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // searching for bootcamps based on search queries
    query = Bootcamp.find(JSON.parse(queryStr));

    // select fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');

        query = query.select(fields);
    }

    // sort the resulsts of the search
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");

        query = query.sort(sortBy);
    } else {
        query = query.sort("-createdAt");
    }

    const bootcamps = await query;

    if (!bootcamps) {
        return res.status(404).json({ success: false });
    }

    res.status(200).json({success:true,count:bootcamps.length, data:bootcamps});
})

// @desc    Get one bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getOneBootcamp = asyncHandler( async (req, res) => { 
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        throw new Error('Bootcamp not found!')
    }

    res.status(200).json({ success: true, data: bootcamp });
})

// @desc    Add new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private/admin
export const addNewBootcamp = asyncHandler( async (req, res) => { 
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({ success: true, data: bootcamp });
})

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private/Admin
export const updateOneBootcamp = asyncHandler( async (req, res) => { 
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true });

    if (!bootcamp) {
        return res.status(404).json({ success: false });
    }

    res.status(201).json({ success: true, data: bootcamp });
})

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private/Admin
export const deleteOneBootcamp = asyncHandler( async (req, res) => {
    
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
        return res.status(404).json({ success: false });
    }

    res.status(200).json({ success: true });
})

// @desc    Get a bootcamp with certain radius
// @route   GET /api/v1/bootcamps/:zipcode/:distance
// @access  Private/Admin
export const getBootcampsWithinRadius = asyncHandler(async (req, res) => {
    
    const { zipcode, distance } = req.params;

    // get lat and lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    
    // earth radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });

    res.status(200).json({ success: true, count:bootcamps.length,data:bootcamps });
})