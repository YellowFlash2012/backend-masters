import asyncHandler from "express-async-handler";

import Bootcamp from "../../models/Bootcamp.js";
import Review from "../../models/Review.js";


// @desc    Get all reviews
// @route   GET /api/v1/reviews
// @route   GET /api/v1/bootcamps/:bootcampID/reviews
// @access  Public
export const getAllReviews = asyncHandler(async (req, res) => {
    
    if (req.params.bootcampID) {
        const reviews = Review.find({ bootcamp: req.params.bootcampID });

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data:reviews
        })
    } else {
        res.status(200).json(res.advancedRes)
    }
});

// @desc    Get one review
// @route   GET /api/v1/reviews/:id
// @access  Public
export const getOneReview = asyncHandler(async (req, res) => {
    const review = await (await Review.findById(req.params.id)).populate({
        path: 'bootcamp',
        select:'name description'
    });

    if (!review) {
        throw new Error("No review found!")
    } 

    return res.status(200).json({
        success: true,
        data: review,
    });
});

// @desc    Add one review
// @route   POST /api/v1/bootcamps/:bootcampID/reviews
// @access  Private
export const addNewReview = asyncHandler(async (req, res) => {
    req.body.bootcamp = req.params.bootcampID
    req.body.user = req.user.id
    
    const bootcamp = await Bootcamp.findById(req.params.bootcampID);

    if (!bootcamp) {
        throw new Error("This bootcamp could not be found!")
    }

    const review = await Review.create(req.body);

    return res.status(201).json({
        success: true,
        data: review,
    });
});

