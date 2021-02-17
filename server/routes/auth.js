const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { body } = require("express-validator");

router.post("/signup", 
body("email").trim().notEmpty().withMessage('Email must not be empty'),
body("username").trim().notEmpty().withMessage('Username must not be empty'),
body("password").notEmpty().withMessage('Password must not be empty'),
body("password").isLength({min: 6}).withMessage('Password must be atleast 6 characters long!'),
authController.signup);

router.post("/login", 
body("email").trim().notEmpty().withMessage('Email must not be empty'),
body("password").notEmpty().withMessage('Password must not be empty'),
authController.login);

router.get("/logout", authController.logout);

module.exports = router;