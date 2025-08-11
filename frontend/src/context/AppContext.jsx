import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const backendUrl = 'http://localhost:3000';
    const [boards, setBoards] = useState([]);
    const [currentBoard, setCurrentBoard] = useState(localStorage.getItem('currentBoard') || null);
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState([]);

    const createBoard = async (body) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/board/newBoard`, body);
            if (data.success) {
                setBoards([...boards, data.newBoard]);
                setCurrentBoard(data.newBoard._id);
                localStorage.setItem('currentBoard', data.newBoard._id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllBoards = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/board/all`);
            if (data.success) {
                setBoards(data.boards);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllTasks = async (boardId) => {
    try {
        const { data } = await axios.get(`${backendUrl}/api/board/${boardId}/tasks`);
        if (data.success) {
            setTasks(data.tasks);
        }
    } catch (error) {
        console.log(error);
    }
};

const updateTask = async (id, updatedData) => {
  try {
    const res = await axios.put(`${backendUrl}/api/board/${id}/update`, updatedData);
    return res.data; 
  } catch (error) {
    console.error("Failed to update task:", error);
  }
};

const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`${backendUrl}/api/board/${id}/delete`);
    return res.data; 
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};


const getTaskById = async (id) => {
  try {
    const res = await axios.get(`${backendUrl}/api/board/${id}`);
    return res.data; 
  } catch (error) {
    console.error('Error fetching task:', error);
    return null; 
  }
};

    const createTask = async (body) => {
    try {
        if (!currentBoard) {
            alert("Select a board first!");
            return;
        }
        const { data } = await axios.post(`${backendUrl}/api/board/${currentBoard}/createTask`, body);
        if (data.success) {
            setTasks(prevTasks => [data.newTask, ...prevTasks]);
        }
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
};


    useEffect(() => {
        if (currentBoard) {
            localStorage.setItem('currentBoard', currentBoard);
        }
    }, [currentBoard]);

    useEffect(() => {
        getAllBoards();
    }, []);

    const value = {
        boards,
        getAllBoards,
        createBoard,
        currentBoard,
        setCurrentBoard,
        showForm,
        setShowForm,
        getAllTasks,
        tasks,
        createTask,
        getTaskById,
        updateTask,deleteTask
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
