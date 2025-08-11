import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Sidebar from './Sidebar';
import '../../App.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const {
    showForm,
    setShowForm,
    getAllTasks,
    tasks,
    createBoard,
    createTask,
    currentBoard,
  } = useContext(AppContext);

  const [formData, setFormData] = useState({ title: '' });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    assignedTo: '',
    dueDate: '',
    status: 'Todo',
  });

  useEffect(() => {
    if (currentBoard) {
      getAllTasks(currentBoard);
    }
  }, [currentBoard]);

  const handleBoardChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTaskChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleBoardSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    createBoard(formData);
    setFormData({ title: '' });
    setShowForm(false);
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) return;

    await createTask(taskData);

    setTaskData({
      title: '',
      description: '',
      priority: 'Low',
      assignedTo: '',
      dueDate: '',
      status: 'Todo',
    });
    setShowTaskForm(false);
    getAllTasks(currentBoard);
  };

  const inputClasses =
    'w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition';

  const formOverlayClasses =
    'fixed inset-0 bg-black/70 flex items-center justify-center z-50';

  const formContainerClasses =
    'bg-gray-800 rounded-md p-6 w-full max-w-md space-y-4';

  const buttonPrimary =
    'bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition';
  const buttonDanger =
    'bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition';

  const todoTasks = tasks.filter((task) => task.status === 'Todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress');
  const completeTasks = tasks.filter((task) => task.status === 'Complete');

  const TaskCard = ({ task }) => (
    <div
      className="bg-gray-800 p-4 rounded-md shadow mb-4 cursor-pointer hover:bg-gray-700 transition"
      onClick={() => navigate(`/${task._id}`)}
      title="Click to view details"
    >
      <h3 className="font-bold">{task.title}</h3>
      {task.description && <p className="text-sm mt-1">{task.description}</p>}
      <p className="text-xs mt-2 text-gray-400">
        Priority: <span className="font-semibold">{task.priority}</span>
      </p>
      <p className="text-xs mt-1 text-gray-400">
        Assigned To: <span className="font-semibold">{task.assignedTo || '-'}</span>
      </p>
      <p className="text-xs mt-1 text-gray-400">
        Due: <span className="font-semibold">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</span>
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-950 text-white relative">
      <Sidebar />

      {/* Board Form */}
      {showForm && (
        <div className={formOverlayClasses}>
          <form onSubmit={handleBoardSubmit} className={formContainerClasses}>
            <h1 className="text-xl font-semibold text-center">Create New Board</h1>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleBoardChange}
              placeholder="Board Title"
              className={inputClasses}
              autoFocus
            />
            <div className="flex gap-4 justify-end">
              <button type="submit" className={buttonPrimary}>
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className={buttonDanger}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Task Form */}
      {showTaskForm && (
        <div className={formOverlayClasses}>
          <form onSubmit={handleTaskSubmit} className={formContainerClasses}>
            <h1 className="text-xl font-semibold text-center">Create New Task</h1>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleTaskChange}
              placeholder="Title"
              className={inputClasses}
              autoFocus
            />
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleTaskChange}
              placeholder="Description"
              className={`${inputClasses} h-24 resize-none`}
            />
            <select
              name="priority"
              value={taskData.priority}
              onChange={handleTaskChange}
              className={inputClasses}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              type="text"
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleTaskChange}
              placeholder="Assigned to"
              className={inputClasses}
            />
            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleTaskChange}
              className={inputClasses}
            />
            <select
              name="status"
              value={taskData.status}
              onChange={handleTaskChange}
              className={inputClasses}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
            <div className="flex gap-4 justify-end">
              <button type="submit" className={buttonPrimary}>
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowTaskForm(false)}
                className={buttonDanger}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tasks Display */}
      <main className="flex-1 p-4 overflow-auto">
        {!currentBoard ? (
          <p className="text-gray-400 text-center mt-10">Select a board to see tasks</p>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold">Tasks</h2>
              <button
                onClick={() => setShowTaskForm(true)}
                className={buttonPrimary}
              >
                + Create New Task
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <section>
                <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Todo</h3>
                {todoTasks.length > 0 ? todoTasks.map(task => (
                  <TaskCard key={task._id} task={task} />
                )) : <p className="text-gray-400">No tasks in Todo</p>}
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">In Progress</h3>
                {inProgressTasks.length > 0 ? inProgressTasks.map(task => (
                  <TaskCard key={task._id} task={task} />
                )) : <p className="text-gray-400">No tasks in Progress</p>}
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Complete</h3>
                {completeTasks.length > 0 ? completeTasks.map(task => (
                  <TaskCard key={task._id} task={task} />
                )) : <p className="text-gray-400">No tasks completed</p>}
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
