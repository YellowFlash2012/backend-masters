import express from "express";
import { deleteOneCourse, getAllCourses, getOneCourse, updateOneCourse } from "../../controllers/v1/courses.js";

const router = express.Router({mergeParams:true});

router.get("/", getAllCourses)
router.get("/:id", getOneCourse)
router.put("/:id", updateOneCourse)
router.delete("/:id", deleteOneCourse)


export default router