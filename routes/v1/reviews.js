import express from "express";
import {
    addNewCourse,
    deleteOneCourse,
    
    
    updateOneCourse,
} from "../../controllers/v1/courses.js";
import { addNewReview, getAllReviews, getOneReview } from "../../controllers/v1/reviews.js";
import advancedRes from "../../middlewares/advancedRes.js";
import { admin, protect } from "../../middlewares/auth.js";
import Course from "../../models/Course.js";

const router = express.Router({ mergeParams: true });

router.get(
    "/",
    advancedRes(Course, {
        path: "bootcamp",
        select: "name description",
    }),
    getAllReviews
);
router.get("/:id", getOneReview);
router.post("/", protect, addNewReview);
router.put("/:id", protect, admin, updateOneCourse);
router.delete("/:id", protect, admin, deleteOneCourse);

export default router;
