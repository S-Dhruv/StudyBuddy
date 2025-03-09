import Task from "../models/task.model.js";

export const createAiTask = async function (_id, aiTask, res) {
    try {
        const lastDate = aiTask.deadline;
        let taskPresent = await Task.findOne({ userId: _id, date: lastDate });

        if (!taskPresent) {
            taskPresent = new Task({
                userId: _id, 
                date: lastDate,
                tasks: []
            });
        }

        taskPresent.tasks.push({
            task: aiTask.task,
            deadline: lastDate,
            estimatedTime: aiTask.estimatedTime,
            difficulty: aiTask.difficulty,
            isAiPlanned: true
        });

        await taskPresent.save();
        console.log("Task Added Successfully");
        return res.status(200).json({ msg: "Task added successfully" }); 
    } catch (err) {
        console.error("Error in adding task:", err);
        return res.status(400).json({ msg: "Error in adding task", error: err.message }); 
    }
};


export const createUserTask = async function (_id, UserTask, res) {
    try {
        const lastDate = UserTask.deadline;
        let taskPresent = await Task.findOne({ userId: _id, date: lastDate });

        if (!taskPresent) {
            taskPresent = new Task({
                userId: _id, 
                date: lastDate,
                tasks: []
            });
        }

        taskPresent.tasks.push({
            task: UserTask.task,
            deadline: lastDate,
            estimatedTime: UserTask.estimatedTime,
            difficulty: UserTask.difficulty,
            isAiPlanned: false
        });

        await taskPresent.save();
        console.log("UserTask Added Successfully");
        return res.status(200).json({ msg: "Task added successfully" }); 
    } catch (err) {
        console.error("Error in adding task:", err);
        return res.status(400).json({ msg: "Error in adding task", error: err.message }); 
    }
};


