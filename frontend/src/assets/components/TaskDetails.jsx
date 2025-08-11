import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask } = useContext(AppContext);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state for editing task, including status
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    assignedTo: '',
    dueDate: '',
    status: 'Todo',
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await getTaskById(id);
        if (!data) throw new Error('Task not found');
        setTask(data);
        setFormData({
          title: data.title || '',
          description: data.description || '',
          priority: data.priority || 'Low',
          assignedTo: data.assignedTo || '',
          dueDate: data.dueDate ? data.dueDate.slice(0, 10) : '',
          status: data.status || 'Todo', // status set here
        });
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load task.');
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, getTaskById]);

  // Update form state on input/select change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle update submit, sends whole formData including status
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, formData);
      alert('Task updated successfully!');
      navigate('/'); // Redirect after update
    } catch {
      alert('Failed to update task.');
    }
  };

  // Handle delete task
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        alert('Task deleted successfully!');
        navigate('/'); // Redirect after delete
      } catch {
        alert('Failed to delete task.');
      }
    }
  };

  if (loading) return <p className="p-4 text-white">Loading task details...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!task) return <p className="p-4 text-gray-400">Task not found.</p>;

  const inputClasses =
    'w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition mb-4';

  const buttonPrimary =
    'bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition mr-3 font-semibold';
  const buttonDanger =
    'bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition font-semibold';

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-gray-900 rounded-md shadow-md text-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Task Details</h1>

      <form onSubmit={handleUpdate}>
        <label className="block font-semibold mb-1" htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={inputClasses}
          required
        />

        <label className="block font-semibold mb-1" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`${inputClasses} h-24 resize-none`}
        />

        <label className="block font-semibold mb-1" htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="block font-semibold mb-1" htmlFor="assignedTo">Assigned To</label>
        <input
          id="assignedTo"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Assignee"
        />

        <label className="block font-semibold mb-1" htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className={inputClasses}
        />

        <label className="block font-semibold mb-1" htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>

        <div className="flex justify-end mt-6">
          <button type="submit" className={buttonPrimary}>Update Task</button>
          <button type="button" onClick={handleDelete} className={buttonDanger}>Delete Task</button>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
