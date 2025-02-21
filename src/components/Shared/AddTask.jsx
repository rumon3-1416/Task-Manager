import React, { useEffect, useRef } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLocation } from 'react-router-dom';
import useProject from '../../Hooks/useProject';

const AddTask = ({ className, project, task_category, setShowTaskForm }) => {
  const addTaskRef = useRef();

  const axiosSecure = useAxiosSecure();
  const { pathname } = useLocation();
  const { refetch } = useProject(pathname);

  // handle Outside Click
  useEffect(() => {
    const handleClick = e => {
      if (!addTaskRef.current.contains(e.target)) {
        setShowTaskForm(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Add Task
  const handleAddTask = async e => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const task = Object.fromEntries(formData.entries());

    const order = task_category
      ? task_category.tasks.length + 1
      : project?.task_categories?.find(cat => cat.category === task.category)
          ?.tasks.length + 1;

    const doc = { ...task, time: Date.now(), order };
    const { data } = await axiosSecure.put(`/task${pathname}`, doc);
    data.acknowledged && (form.reset(), setShowTaskForm(false), refetch());
  };

  return (
    <div
      ref={addTaskRef}
      id="addTask"
      className={`bg-white p-3 border-[1.5px] border-gray-300 rounded-md shadow-lg absolute z-10 ${className}`}
    >
      <form onSubmit={handleAddTask} className="text-sm flex flex-col">
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
          maxLength={50}
          required
        />
        {/* Category */}
        <label className="font-medium" htmlFor="category">
          Category
        </label>
        <select
          className={`px-2 py-0.5 mb-3 text-sm border-[1.5px] border-gray-300 rounded-md outline-none ${
            task_category?.category && 'pointer-events-none'
          }`}
          name="category"
          id="category"
          defaultValue={task_category?.category || 'Todo'}
          required
        >
          <option value="Todo">Todo</option>
          <option value="In-progress">In-progress</option>
          <option value="Done">Done</option>
        </select>
        {/* Time */}
        <label className="font-medium" htmlFor="time">
          Start At
        </label>
        <input
          className="px-2 py-0.5 mb-3 text-sm border-[1.5px] border-gray-300 rounded-md outline-none"
          type="text"
          name="time"
          id="time"
          value={new Date().toLocaleDateString()}
          placeholder="Start At"
          required
          readOnly
        />
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
          rows={3}
          maxLength={200}
          required
        />

        <button
          type="submit"
          className="bg-teal3 hover:bg-teal2 text-sm font-medium px-2 py-1 rounded-md border-[1.5px] border-gray-300"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
