import express from "express";
import { addNewBootcamp, deleteOneBootcamp, getAllBootcamps, getBootcampsWithinRadius, getOneBootcamp, updateOneBootcamp } from "../../controllers/v1/bootcamps.js";

import courseRoutes from "./courses.js";

const router = express.Router();

// ***re-route into other routes
router.use("/:bootcampID/courses", courseRoutes);

// ***bootcamps routes
router.get("/", getAllBootcamps)

router.get("/:id", getOneBootcamp)

router.post("/", addNewBootcamp)

router.put("/:id", updateOneBootcamp)

router.delete("/:id", deleteOneBootcamp)

router.get("/radius/:zipcode/:distance", getBootcampsWithinRadius)

export default router