import express from 'express';
import { createBoard, createTask, deleteTask, getAllBoards, getAllTasks, getTaskById, updateTask } from '../controllers/boardControls.js';

const boardRouter = express.Router();

boardRouter.get('/all', getAllBoards);
boardRouter.post('/newBoard', createBoard);
boardRouter.get('/:id/tasks', getAllTasks); 
boardRouter.post('/:id/createTask', createTask);
boardRouter.put('/:id/update', updateTask);
boardRouter.get('/:id',getTaskById)
boardRouter.delete('/:id/delete', deleteTask);



export default boardRouter;
