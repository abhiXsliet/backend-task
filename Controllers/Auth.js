const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({email});
        
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });  
        }

        // Secure The Password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error) {
            return res.status(400).json({
                success: false,
                message: "Error in hasing password",
            })
        }

        // Create Entry For User
        const user = await User.create({
            name, email, password: hashedPassword, role
        });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User Cannot Be Registered, Please Try Again!"
        });
    }
}


exports.login = async function (req, res) {
    try{
        const{ email, password } = req.body;

        if(!email || !password) {
            return res.status(403).json({
                success: false,
                message: "Please Fill All Details Carefully",
            });
        }

        let user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User Is Not Registered",
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };

        // Verify Password & Generate A JWT Token
        if(await bcrypt.compare(password, user.password) ) {
            // Password Match
            let token = jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn: "2h",
                                });
            
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token, 
                user,
                message: "User Logged In Successfully"
            });
        }
        else {
            // Password Do Not Matches
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ 
            success: false,
            message: "Login Failure",
        });
    }
}

