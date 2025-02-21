import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

const TaskCard = ({ category }) => {
  console.log(category);

  const handleAddTask = () => {};

  return (
    <div
      id={category.title}
      className="bg-coralBg p-2 border-[1.5px] border-gray-300 rounded-md"
    >
      {/* Head */}
      <div className="flex justify-between items-center gap-2">
        <h3 className="font-semibold">{category.title}</h3>
        <div className="flex items-center gap-2">
          <button className="hover:bg-gray-200 text-lg size-6 flex justify-center items-center rounded-md">
            +
          </button>
          <button className="hover:bg-gray-200 text-lg size-6 flex justify-center items-center rounded-md">
            <BsThreeDots />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white p-2 mt-1 border-[1.5px] border-gray-300 rounded-md"></div>

      {/* Foot */}
      <div className="mt-1 relative">
        <button className="hover:bg-gray-200 w-full text-left px-2 py-0.5 rounded-md">
          <span className="text-lg">+</span> Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
