import express from "express";
import { addNewCourse, deleteOneCourse, getAllCourses, getOneCourse, updateOneCourse } from "../../controllers/v1/courses.js";
import advancedRes from "../../middlewares/advancedRes.js";
import Course from "../../models/Course.js";

const router = express.Router({mergeParams:true});

router.get("/", advancedRes(Course, {
    path: 'bootcamp',
    select:'name description'
}), getAllCourses)
router.get("/:id", getOneCourse)
router.post("/", addNewCourse)
router.put("/:id", updateOneCourse)
router.delete("/:id", deleteOneCourse)


export default router