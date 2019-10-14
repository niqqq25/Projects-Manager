const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authUser = require("../middleware/authUser");

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.get("/me", authUser, userController.getMe);
router.delete("/me", authUser, userController.deleteMe);
router.patch("/me/password", authUser, userController.updateMyPassword);
router.patch("/me", authUser, userController.updateMe);
router.get("/:user_id", authUser, userController.getUserById);
router.get("/", authUser, userController.getUsers);

module.exports = router;
