import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {JWT_SECRET_KEY} from '../config/config.js';

export const registerUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        //validator
        const existUser = await User.findOne({email});
        if(existUser)return res.status(401).json({message:"email already exists"})

        //hash password
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User(
            {
                email,
                password:hashPassword
            });
        //add new user to db
        await newUser.save();
        res.status(201).json({
            message:"user created successfully",
            user:{
                id:newUser._id,
                email:newUser.email,
            }
        })
    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if (!user) return res.status(401).json({message:"Email not found"})

        const match = await bcrypt.compare(password, user.password)
        if(!match)return res.status(401).json({message:"Password is incorrect"})

        const token = jwt.sign(
            {
                id:user._id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET_KEY,
            {expiresIn:"1h"}
        )
        res.status(200).json({
            message:"Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}