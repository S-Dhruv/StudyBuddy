import mongoose, { mongo } from "mongoose";
const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    task_type: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
const Task = mongoose.model("Task", taskSchema);
export default Task