import mongoose from "mongoose";
const taskSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true,
    },
    deadline:{
        type:Date,
        required:true,
    },
    estimatedTime:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        required:true,
    },
    isAiPlanned:{
        type:Boolean,
        required:true,
    }
})
const maintaskSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    date:{
        type: Date,
        required:true,
    },
    tasks:[taskSchema]
})
const Task = mongoose.model("Task", maintaskSchema);
export default Task