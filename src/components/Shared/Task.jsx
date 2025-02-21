import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLocation } from 'react-router-dom';
import useProject from '../../Hooks/useProject';

const Task = ({ task }) => {
  const taskRef = useRef(null);
  const [showUpdateTask, setShowUpdateTask] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { pathname } = useLocation();
  const { refetch } = useProject(pathname);

  // handle Outside Click
  useEffect(() => {
    const handleClick = e => {
      if (!taskRef.current.contains(e.target)) {
        setShowUpdateTask(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Update Task
  const handleUpdateTask = async e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedTask = Object.fromEntries(formData.entries());

    const updatedDoc = {
      ...updatedTask,
      category: task.category,
      order: task.order,
      time: task.time,
    };

    const { data } = await axiosSecure.patch(`/task${pathname}`, updatedDoc);
    data.acknowledged && (form.reset(), setShowUpdateTask(false), refetch());
  };

  return (
    <div className="bg-white px-2 py-1 mt-1 border-[1.5px] border-gray-300 rounded-md flex justify-between items-center relative">
      <p>{task.title}</p>

      <button
        onClick={() => setShowUpdateTask(true)}
        className="hover:bg-gray-200 px-1.5 py-1 rounded-sm"
      >
        <BsThreeDots />
      </button>

      {/* Update Task */}
      <div
        ref={taskRef}
        className={`bg-gray-50 p-3 border-[1.5px] border-gray-300 rounded-md shadow-lg absolute top-8 right-0 z-10 ${
          showUpdateTask ? '' : 'hidden'
        }`}
      >
        <form onSubmit={handleUpdateTask} className="text-sm flex flex-col">
          {/* Title */}
          <label className="font-medium" htmlFor="title">
            Title
          </label>
          <input
            className="px-2 py-0.5 mb-3 text-sm border-[1.5px] border-gray-300 rounded-md outline-none"
            type="text"
            name="title"
            id="title"
            placeholder="Task Title"
            defaultValue={task.title}
            maxLength={50}
            required
          />
          {/* Category */}
          <p className="font-medium mb-3">
            Category - <span className="font-normal">{task.category}</span>
          </p>
          {/* Time */}
          <p className="font-medium">Timestamp</p>
          <p className="mb-3">{`${new Date().toLocaleDateString()} - ${new Date().toLocaleDateString()}`}</p>
          {/* Description */}
          <label className="font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            className="px-2 py-0.5 mb-3 text-sm border-[1.5px] border-gray-300 rounded-md outline-none resize-none"
            type="text"
            name="description"
            id="description"
            placeholder="Task Description"
            defaultValue={task.description}
            rows={3}
            maxLength={200}
            required
          />

          <button
            type="submit"
            className="bg-teal3 hover:bg-teal2 text-sm font-medium px-2 py-1 rounded-md border-[1.5px] border-gray-300"
          >
            Update Task
          </button>
          <button
            type="button"
            className="bg-[#ffd9d5] hover:bg-[#ffc2bc] text-sm font-medium px-2 py-1 mt-2 rounded-md border-[1.5px] border-gray-300"
          >
            Delete Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Task;
