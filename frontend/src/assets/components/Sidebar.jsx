import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Sidebar = () => {
  const { boards, currentBoard, setCurrentBoard, setShowForm } = useContext(AppContext);

  return (
    <aside className="w-[280px] bg-gray-900 text-white flex flex-col py-6 px-4 border-r border-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-center">Boards</h1>

      <button
        onClick={() => setShowForm(true)}
        className="mb-6 w-full bg-blue-600 hover:bg-blue-700 transition rounded-md py-2 font-semibold shadow-md"
      >
        + Create Board
      </button>

      <nav className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-160px)]">
        {boards && boards.length > 0 ? (
          boards.map((board) => (
            <button
              key={board._id}
              onClick={() => setCurrentBoard(board._id)}
              className={`text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200
                ${
                  currentBoard === board._id
                    ? 'bg-blue-700 shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
            >
              {board.title}
            </button>
          ))
        ) : (
          <p className="text-gray-400 text-center italic">No boards available</p>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
