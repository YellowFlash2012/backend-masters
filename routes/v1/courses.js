import express from "express";
import { addNewCourse, deleteOneCourse, getAllCourses, getOneCourse, updateOneCourse } from "../../controllers/v1/courses.js";
import advancedRes from "../../middlewares/advancedRes.js";
import { admin, protect } from "../../middlewares/auth.js";
import Course from "../../models/Course.js";

const router = express.Router({mergeParams:true});

router.get("/", advancedRes(Course, {
    path: 'bootcamp',
    select:'name description'
}), getAllCourses)
router.get("/:id", getOneCourse)
router.post("/", protect, admin, addNewCourse)
router.put("/:id", protect, admin, updateOneCourse)
router.delete("/:id", protect, admin, deleteOneCourse)


export default router