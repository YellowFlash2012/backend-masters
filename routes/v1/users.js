import express from "express";
import { forgotPw, resetPw, updateUserDetails, updateUserPw, userLogin, userSignup } from "../../controllers/v1/users.js";
import { protect } from "../../middlewares/auth.js";

const router = express.Router()

router.post("/", userSignup)
router.post("/login", userLogin)
router.put("/", protect, updateUserDetails)
router.put("/update-pw", protect, updateUserPw);

router.post("/forgot-pw", forgotPw)
router.put("/reset-pw/:resettoken", resetPw)

export default router