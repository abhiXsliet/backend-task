const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try{
        // Extract JWT Tokes from either cookie or body or header 
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        if(!token || token == undefined) {
            return res.status(401).json({
                success: false,
                message: "Token Missing",
            });
        }

        // Verify Token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token Is Invalid",
            });
        }
        next();
        
    } catch(error){
        return res.status(400).json({
            success: false,
            message: "Something Went Wrong While Verifying Token",
            error: error.message,
        });
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if(req.user.role !== "Student") {
            return res.status(403).json({
                success: false,
                message: "This Is a Protected Route For Student",
            }) 
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role Is Not Matching",
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This Is a Protected Route For Admin",
            }) 
        }
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role Is Not Matching",
        })
    }
}