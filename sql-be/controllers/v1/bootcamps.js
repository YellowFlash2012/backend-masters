import Bootcamp from "../../models/Bootcamp.js";

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getAllBootcamps = ((req, res, next) => {
    res.status(200).send("All bootcamps")
 })

// @desc    Get one bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getOneBootcamp = ((req, res, next) => { 
    res.status(200).send("One bootcamp found");
})

// @desc    Create one bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private/Admin
export const createOneBootcamp = async(req, res, next) => { 
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        data:bootcamp
    })
}

// @desc    Update one bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private/Admin
export const updateOneBootcamp = ((req, res, next) => { })

// @desc    Delete one bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private/Admin
export const deleteOneBootcamps = ((req, res, next) => { })