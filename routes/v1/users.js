import express from "express";
import { addNewUserByAdmin, deleteUserByAdmin, forgotPw, getAllUsers, getOneUser, resetPw, updateUserByAdmin, updateUserDetails, updateUserPw, userLogin, userSignup } from "../../controllers/v1/users.js";
import { admin, protect } from "../../middlewares/auth.js";
import advancedRes from "../../middlewares/advancedRes.js";
import User from "../../models/User.js";

const router = express.Router()

router.post("/", userSignup)
router.post("/login", userLogin)
router.put("/", protect, updateUserDetails)
router.put("/update-pw", protect, updateUserPw);

router.post("/forgot-pw", forgotPw)
router.put("/reset-pw/:resettoken", resetPw)

// ***admin section
router.get("/", protect,admin, advancedRes(User), getAllUsers)
router.get("/:id", protect, admin, getOneUser)
router.post("/", protect, admin, addNewUserByAdmin);
router.put("/:id", protect,admin, updateUserByAdmin)
router.delete("/:id", protect,admin, deleteUserByAdmin)

export default router