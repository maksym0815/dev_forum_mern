const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const { body } = require("express-validator");

router.get("/",postController.getPosts);

router.post("/",
body("title").notEmpty().withMessage('Title must not be empty'),
body("title").trim().isLength({min: 5, max: 150}).withMessage('Title must be between 5 to 150 characters long.'), 
body("body").notEmpty().withMessage('Body must not be empty'),
body("body").isLength({min: 5, max: 2000}).withMessage('Body must be between 5 to 2000 characters long.'),
postController.createPost);

router.patch("/", postController.updatePost);

module.exports = router;