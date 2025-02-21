import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import AddTask from '../../components/Shared/AddTask';

const ProjectBar = ({ project }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <div className="mb-6 flex justify-between items-center gap-4 relative">
      <h2 className="font-semibold text-xl">{project.title}</h2>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowTaskForm(true)}
          className="hover:bg-gray-200 font-medium text-left px-2 py-0.5 h-9 rounded-md border-[1.5px] border-gray-300"
        >
          <span className="text-lg">+</span> Add Task
        </button>
        <button className="hover:bg-gray-200 text-lg px-2 py-1 h-9 rounded-md border-[1.5px] border-gray-300">
          <BsThreeDots />
        </button>
      </div>

      {/* Options */}
      <div className="bg-white p-3 border-[1.5px] border-gray-300 rounded-md absolute top-9 right-1 hidden">
        <button className="bg-red-100 hover:bg-red-200 text-sm font-medium px-2 py-1 rounded-md border-[1.5px] border-gray-300">
          Delete Project
        </button>
      </div>

      {/* Add Task */}
      <AddTask
        project={project}
        setShowTaskForm={setShowTaskForm}
        className={`top-9 right-10 ${showTaskForm ? '' : 'hidden'}`}
      />
    </div>
  );
};

export default ProjectBar;
