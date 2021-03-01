const express = require("express");
const router = express.Router();
const {register,login,logout} = require("../controllers/auth");
const { body } = require("express-validator");

router.post("/register", 
body("email").trim().notEmpty().withMessage('Email must not be empty'),
body("email").isEmail().withMessage('Please enter a valid email').normalizeEmail(),
body("username").trim().notEmpty().withMessage('Username must not be empty'),
body("password").notEmpty().withMessage('Password must not be empty'),
body("password").isLength({min: 6}).withMessage('Password must be atleast 6 characters long!'),
body("confirmPassword").notEmpty().withMessage('Confirm password must not be empty'),
register);

router.post("/login", 
body("email").trim().notEmpty().withMessage('Email must not be empty'),
body("password").notEmpty().withMessage('Password must not be empty'),
login);

module.exports = router;