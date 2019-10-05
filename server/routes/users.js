const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authUser = require("../middleware/authUser");

router.post("/users/signup", userController.signUp);
router.post("/users/signin", userController.signIn);
router.get("/users/me", authUser, userController.getMe);
router.delete("/users/me", authUser, userController.deleteMe);
router.patch("/users/me/password", authUser, userController.updateMyPassword);
router.patch("/users/me", authUser, userController.updateMe);
router.get("/users/:id", userController.getUserById);
router.get("/users", userController.getUsers);

module.exports = router;
