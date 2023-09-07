import express from "express"
import { createOneBootcamp, deleteOneBootcamps, getAllBootcamps, getOneBootcamp, updateOneBootcamp } from "../../controllers/v1/bootcamps.js";

const router = express.Router();

router.get("/", getAllBootcamps)

router.post("/", createOneBootcamp)

router.get("/:id", getOneBootcamp)

router.put("/:id", updateOneBootcamp)

router.delete("/:id", deleteOneBootcamps)

export default router