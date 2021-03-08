const express = require("express");
const userController = require("../controllers/user");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/user/:userId", isAuth, userController.getUser);
router.put("/user/:userId", isAuth, userController.updateUser);
router.delete("/user/:userId", isAuth, userController.deleteUser);
router.get("/user", userController.findUser);
router.put("/user/:userId/follow", isAuth, userController.followUser);
router.put("/user/:userId/unfollow", isAuth, userController.unfollowUser);

module.exports = router;