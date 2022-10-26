import asyncHandler from "express-async-handler"

import Bootcamp from "../../models/Bootcamp.js"


// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getAllBootcamps = asyncHandler( async (req, res) => {
    const bootcamps = await Bootcamp.find();

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

    res.status(201).json({ success: true });
})