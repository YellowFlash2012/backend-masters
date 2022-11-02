import express from "express";

import { addNewBootcamp, deleteOneBootcamp, getAllBootcamps, getBootcampsWithinRadius, getOneBootcamp, updateOneBootcamp, uploadPhoto } from "../../controllers/v1/bootcamps.js";
import advancedRes from "../../middlewares/advancedRes.js";
import { admin, protect } from "../../middlewares/auth.js";
import Bootcamp from "../../models/Bootcamp.js";

import courseRoutes from "./courses.js";
import reviewRoutes from "./reviews.js"

const router = express.Router();

// ***re-route into other routes
router.use("/:bootcampID/courses", courseRoutes);
router.use("/:bootcampID/reviews", reviewRoutes);

// ***bootcamps routes
router.get("/", advancedRes(Bootcamp, 'courses'), getAllBootcamps)

router.get("/:id", getOneBootcamp)

router.post("/",protect, admin, addNewBootcamp)

router.put("/:id", protect, admin, updateOneBootcamp)

router.delete("/:id", protect, admin, deleteOneBootcamp)

router.get("/radius/:zipcode/:distance", getBootcampsWithinRadius)

router.put("/:id/photo", protect, admin, uploadPhoto)

export default router