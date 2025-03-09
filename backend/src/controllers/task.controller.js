import Task from "../models/task.model.js";
// import User from "../models/user.model.js";

export const createAiTask = async function (uid,aiTask){
   // const {ObjectId} = require('mongodb');
    try{
        const lastDate=new Date(aiTask.Deadline);
        let taskPresent = await Task.findOne({userId:uid,date:lastDate});
        if(!taskPresent){
            taskPresent = new Task({
                userId:uid,
                date:lastDate,
                tasks:[]
            });   
        } 
        taskPresent.tasks.push({
            task:aiTask.task,
            deadline:lastDate,
            estimatedTime:aiTask.estimatedTime,
            difficulty:aiTask.difficulty,
            isAiPlanned:true
        });
        await taskPresent.save();
        return {msg:"Task added successfully"};
    }
    catch(err){
        return {msg:"Error in adding task"};
    }
    
}


export const createUserTask = async function (uid,userTask){
    try{
        const lastDate=new Date(userTask.Deadline);
        let taskPresent = await Task.findOne({userId:uid,date:lastDate});
        if(!taskPresent){
            taskPresent = new Task({
                userId:uid,
                date:lastDate,
                tasks:[]
            });   
        } 
        taskPresent.tasks.push({
            task:userTask.task,
            deadline:userTask.Deadline,
            estimatedTime:userTask.estimatedTime,
            difficulty:userTask.difficulty,
            isAiPlanned:false
        });
        await taskPresent.save();
        return {msg:"Task added successfully"};
    }
    catch(err){
        return {msg:"Error in adding task"};
    }
}
