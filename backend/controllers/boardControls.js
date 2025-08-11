import Board from "../models/boardModel.js";
import Task from "../models/taskModel.js";

export const createBoard = async(req,res)=>{
    try {
    const {title} = req.body;  
    const newBoard = await Board.create({title});
    res.status(201).json({success:true,message:"New board created", newBoard});
    } catch (error) {
        console.log("error in create board", error)
    }
}


export const getAllBoards = async(req,res)=>{
    try {
        const boards = await Board.find().sort({createdAt:-1});
        res.status(200).json({success:true,message:"All boards",boards});
    } catch (error) {
        console.log("error in get all boards: ", error)
    }
}


export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignedTo } = req.body;
    const boardId = req.params.id;  

    if (!title) {
      return res.status(400).json({ success: false, message: "Task title is required" });
    }

    const newTask = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      boardId
    });

    await Board.findByIdAndUpdate(boardId, { $push: { tasks: newTask._id } });

    res.status(201).json({
      success: true,
      message: "New task created",
      newTask
    });
  } catch (error) {
    console.log("error in create task function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const getAllTasks = async (req, res) => {
    try {
        const id = req.params.id; 
        const tasks = await Task.find({ boardId: id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "All tasks",
            tasks
        });
    } catch (error) {
        console.log("error in get all tasks", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updateData = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error while updating task' });
  }
}

export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).populate('boardId');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error while fetching task' });
  }
};



export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};