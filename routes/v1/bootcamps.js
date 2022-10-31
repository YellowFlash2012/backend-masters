import express from "express";

import { addNewBootcamp, deleteOneBootcamp, getAllBootcamps, getBootcampsWithinRadius, getOneBootcamp, updateOneBootcamp, uploadPhoto } from "../../controllers/v1/bootcamps.js";
import advancedRes from "../../middlewares/advancedRes.js";
import Bootcamp from "../../models/Bootcamp.js";

import courseRoutes from "./courses.js";

const router = express.Router();

// ***re-route into other routes
router.use("/:bootcampID/courses", courseRoutes);

// ***bootcamps routes
router.get("/", advancedRes(Bootcamp, 'courses'), getAllBootcamps)

router.get("/:id", getOneBootcamp)

router.post("/", addNewBootcamp)

router.put("/:id", updateOneBootcamp)

router.delete("/:id", deleteOneBootcamp)

router.get("/radius/:zipcode/:distance", getBootcampsWithinRadius)

router.put("/:id/photo", uploadPhoto)

export default router