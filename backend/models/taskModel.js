import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    status:{type:String, required:true,default: "Todo"},
    priority:{type:String, required:true, default:"medium"},
    assignedTo:{type:String, required:true},
    dueDate:{type:Date, required:true, default:Date.now},
    boardId:{type:mongoose.Schema.Types.ObjectId, ref:"Board"},
},{timestamps:true})


const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;