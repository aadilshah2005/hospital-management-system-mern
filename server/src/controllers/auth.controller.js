import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

          if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Please enter a valid email",
            });
            }
        
            if(password.length < 6){
                return res.status(400).json({
                    message: "Password should be at least 6 characters",
                });
            }

        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message: "All fileds are required"
            })
        }

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                success:false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            success:true,
            message: "User Registered successfully",
            user:{
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message: "User registration failed",
            error:error.message
        })
    }
    
}

export const loginUser = async (req, res) => {
    try {
        const {email, password, rememberMe, role} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success:false,
                message: "All fileds are required"
            })
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        if(user.role !== role){
        return res.status(403).json({
            success: false,
            message: "Invalid role selected"
        })
    }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message: "Invalid email or password",
            })
        }

        const tokenExpiry = rememberMe ? "7d" : "1d";

        const token = jwt.sign(
            {"userId": user._id, "userRole": user.role},
            process.env.JWT_SECRET,
            {expiresIn: tokenExpiry}
        )

        const cookieMaxAge = rememberMe
        ? 7 * 24 * 60 * 60 * 1000
        : 24 * 60 * 60 * 1000;

        res.cookie("UserToken", token, {
            httpOnly: true,
            secure: false, // production me true karna hai mujhe
            sameSite: "lax",
            maxAge: cookieMaxAge, 
        });

        const userData = user.toObject();
        delete userData.password
        // console.log(userData);
        

        res.status(200).json({
            success:true,
            message: "Login successful",
            user: userData
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message: "Invalid email or password",
            error:error.message
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message: "user not found"
            })
        }

        const userData = user.toObject();
        delete userData.password
        res.status(200).json({
            success:true,
            message:"User get successfully",
            userData
        })

    } catch (error) {
        console.log(error.message);
        res.status({
            success:false,
            message: "Get profile error",
            error:error.message
        })
    }
}


export const logOutUser = (req, res) => {
  try {
    res.clearCookie("UserToken");

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
    
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Logout error",
      error: error.message,
    });
  }
};