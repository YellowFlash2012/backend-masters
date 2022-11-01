import asyncHandler from "express-async-handler"
import path from 'path'
import Bootcamp from "../../models/Bootcamp.js"
import geocoder from "../../utils/geocoder.js";


// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getAllBootcamps = asyncHandler(async (req, res) => {
    

    res.status(200).json(res.advancedRes);
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
export const addNewBootcamp = asyncHandler(async (req, res) => { 
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({ success: true, data: bootcamp });
})

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private/Admin
export const updateOneBootcamp = asyncHandler( async (req, res) => { 
    let bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return res.status(404).json({ success: false });
    }

    // check if user is bootcamp creator
    if (bootcamp.user.toString() !== req.user.id && req.user.role !=="admin") {
        throw new Error("You are NOT authorized to do that!");
    }
    // toString() because req.user.id type is string while bootcamp.user type is ObjectId

    bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(201).json({ success: true, data: bootcamp });
})

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private/Admin
export const deleteOneBootcamp = asyncHandler( async (req, res) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return res.status(404).json({ success: false });
    }

    // check if user is bootcamp creator
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
        throw new Error("You are NOT authorized to do that!");
    }

    await bootcamp.remove();

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

// @desc    Upload bootcamp's photo
// @route   PUT /api/v1/bootcamps/:id/photo
// @access  Private/Admin
export const uploadPhoto = asyncHandler( async (req, res) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        throw new Error(`Bootcamp with id ${req.params.id} not found!`);
    }

    // check if user is bootcamp creator
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
        throw new Error("You are NOT authorized to do that!");
    }

    if (!req.files) {
        throw new Error("Please upload a file!");
    }

    const file = req.files.file;

    // is uploaded file an image?
    if (!file.mimetype.startsWith("image")) {
        throw new Error("Please upload an image file");
    }

    // check file size
    if (file.size > proces.env.max_file_size) {
        throw new Error(
            `File size should be less than ${proces.env.max_file_size}`
        );
    }

    // create custom filename to avoid file overwrite
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.file_upload_path}/${file.name}`, async (err) => {
        if (err) {
            console.error(err);
            throw new Error("Problem with file upload");
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

        res.status(201).json({ success: true, data: file.name });
    });
})