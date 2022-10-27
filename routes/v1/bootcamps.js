import express from "express";
import { addNewBootcamp, deleteOneBootcamp, getAllBootcamps, getBootcampsWithinRadius, getOneBootcamp, updateOneBootcamp } from "../../controllers/v1/bootcamps.js";

const router = express.Router();

router.get("/", getAllBootcamps)

router.get("/:id", getOneBootcamp)

router.post("/", addNewBootcamp)

router.put("/:id", updateOneBootcamp)

router.delete("/:id", deleteOneBootcamp)

router.get("/radius/:zipcode/:distance", getBootcampsWithinRadius)

export default router