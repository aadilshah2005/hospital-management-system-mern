import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message: "All fileds are required"
            })
        }

        const user = await User.findOne({email});
        if (user) {
            return res.status({
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
        const {email, password} = req.body;
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

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message: "Invalid email or password",
            })
        }

        const token = jwt.sign(
            {"userId": user._id, "userRole": user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.cookie("UserToken", token, {
            httpOnly: true,
            secure: false, // production me true karna hai mujhe
            maxAge: 7 * 24 * 60 * 60 * 1000, 
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

export const getProfile = (req, res) => {
    try {
        res.send("Get Profile")
    } catch (error) {
        console.log(error.message);
        res.status({
            success:false,
            message: "Get profile error",
            error:error.message
        })
    }
}