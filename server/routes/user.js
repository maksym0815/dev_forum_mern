const express = require("express");
const userController = require("../controllers/user");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/user/:userId", isAuth, userController.getUser);
router.put("/user/:userId", isAuth, userController.updateUser);
router.delete("/user/:userId", isAuth, userController.deleteUser);
router.get("/user", userController.findUser);

module.exports = router;