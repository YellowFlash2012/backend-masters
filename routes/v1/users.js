import express from "express";
import { userLogin, userSignup } from "../../controllers/v1/users.js";

const router = express.Router()

router.post("/", userSignup)
router.post("/login", userLogin)

export default router