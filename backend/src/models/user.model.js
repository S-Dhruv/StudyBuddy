import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {   
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            unique: true,
            lowercase: true,
        },
        student_type: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        age: {
            type: Number,
            required: true,
            min: 1,
        },
        profilePic: {
            type: String,
            default: ""
        },
        grade: {
            type: "String",
            required: true,
        },
        subjects: {
            type: [String],
            required: true,
        }
    },
    { timestamps: true }
)
const User = mongoose.model("User", userSchema)
export default User