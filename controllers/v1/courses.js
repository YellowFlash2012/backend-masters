import asyncHandler from "express-async-handler";
import Course from "../../models/Course.js";


// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampID/courses
// @access  Public
export const getAllCourses = asyncHandler(async (req, res) => {
    let query;
    console.log(req.params.bootcampID);

    if (req.params.bootcampID) {
        query = Course.find({ bootcamp: req.params.bootcampID });
    } else {
        query = Course.find();
    }

    const courses = await query;

    res.status(200).json({
        success: true,
        count: courses.length,
        
        data: courses,
    });
});

// @desc    Get one course
// @route   GET /api/v1/courses/:id
// @access  Public
export const getOneCourse = asyncHandler(async (req, res) => {
    
    res.status(200).json({ success: true, data: course });
});

// @desc    Add new course
// @route   POST /api/v1/courses
// @access  Private/admin
export const addNewCourse = asyncHandler(async (req, res) => {

    res.status(201).json({ success: true, data: course });
});

// @desc    Update a course
// @route   PUT /api/v1/courses/:id
// @access  Private/Admin
export const updateOneCourse = asyncHandler(async (req, res) => {
    
    res.status(201).json({ success: true, data: course });
});

// @desc    Delete a course
// @route   DELETE /api/v1/courses/:id
// @access  Private/Admin
export const deleteOneCourse = asyncHandler(async (req, res) => {
    

    res.status(200).json({ success: true });
});

