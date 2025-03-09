import User from "../models/user.model.js";
import bcrypt from "bcryptjs"


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({
                "message": "Invalid Credentials!"
            })
        }
    } catch (error) {
        console.log('Signup Error :', error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
    console.log("LOGIN");
    res.status(200).json("LOGIN!")
}
export const signup = async (req, res) => {
    const { email, name, password, age, grade, subjects } = req.body
    try {
        if (!email || !name || !password || password.length < 6 || !age || subjects.length == 0) {
            res.status(400).json({
                "message": "Invalid Credentials!"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = await new User({
            name, email,
            password: hashPassword, age, grade, subjects,
        })
        if (newUser) {
            const token = generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
                token,
            })
        } else {
            res.status(400).json({
                message: "Invalid User Data"
            })
        }
    } catch (error) {
        console.log('Signup Error :', error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}
export const logout = async (req, res) => {
    try {

    } catch (error) {
        console.log('Signup Error :', error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}
export const updateProfile = async function(req,res){
    try {
        const {email,name,age,grade,subjects}=req.body;
        const user=await User.find(email);
        if(!user){
            res.status(404).json({
                message:"User not found!"
            })
        }
        if(user.email!=email){
            message:"Email cannot be Changed";
        }
        if(name){  
            user.name=name;
        }
        if(age){
            user.age=age;
        }
        if(grade){
            user.grade=grade;
        }
        if(subjects){
            user.subjects=subjects;
        }
        await user.save();
        res.status(200).json({
            message:"Profile Updated!"
        })
    }
    catch(error){
        res.status(500).json({
            message:"Internal Server Error!"
        })
    } 
                 
}