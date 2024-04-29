const express = require('express');
const router = express.Router();

const User = require('../models/User');

const {login, signup} = require("../controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);

// Testing Route
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message:"Welcome To The Route For TEST...",
    })
})

// Protected Route For Student
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome To The Protected Route Student",
    });
});

// Protected Route For Admin
router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome To The Protected Route Admin",
    });
});

module.exports = router;