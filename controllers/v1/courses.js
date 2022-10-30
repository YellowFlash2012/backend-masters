import asyncHandler from "express-async-handler";
import Bootcamp from "../../models/Bootcamp.js";
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
        query = Course.find().populate({
            path: 'bootcamp',
            select:'name description'
        });
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
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select:'name description'
    });

    if (!course) {
        throw new Error(`No course with the id of ${req.params.id}`, 404);
    }
    res.status(200).json({ success: true, data: course });
});

// @desc    Add new course
// @route   POST /api/v1/bootcamps/:bootcampID/courses
// @access  Private/admin
export const addNewCourse = asyncHandler(async (req, res) => {
    req.body.bootcamp = req.params.bootcampID;

    const bootcamp = await Bootcamp.findById(req.params.bootcampID);

    if (!bootcamp) {
        throw new Error(`No bootcamp with the ID of ${req.params.bootcampID}`);
    }

    const course = await Course.create(req.body);

    res.status(201).json({ success: true, data: course });
});

// @desc    Update a course
// @route   PUT /api/v1/courses/:id
// @access  Private/Admin
export const updateOneCourse = asyncHandler(async (req, res) => {
    let course = await Course.findById(req.params.id);

    if (!course) {
        throw new Error(`No course found with the id of ${req.params.id}`);
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

    
    res.status(201).json({ success: true, data: course });
});

// @desc    Delete a course
// @route   DELETE /api/v1/courses/:id
// @access  Private/Admin
export const deleteOneCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        throw new Error(`No course found with the id of ${req.params.id}`);
    }

    await course.remove();

    res.status(200).json({ success: true });
});

