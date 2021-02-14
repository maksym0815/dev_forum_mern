const express = require("express");
const router = express.Router();
const postController = require("../controllers/post")
const { body } = require("express-validator");

router.get("/",postController.getPosts);
router.post("/",body("title").trim().isLength({min: 5, max: 150}), body("body").isLength({min: 5, max: 2000}) ,postController.createPost);

module.exports = router