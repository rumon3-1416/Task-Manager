import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Draggable } from '@hello-pangea/dnd';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLocation } from 'react-router-dom';
import useProject from '../../Hooks/useProject';

const Task = ({ task, index }) => {
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

  // Delete Task
  const handleDelete = async () => {
    const { data } = await axiosSecure.delete(`/task${pathname}`, {
      data: { category: task.category, time: task.time, order: task.order },
    });

    data.acknowledged && (setShowUpdateTask(false), refetch());
  };

  return (
    <Draggable draggableId={String(task.time)} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white px-2 py-1 mt-1 border-[1.5px] border-gray-300 rounded-md flex justify-between items-center gap-2 relative"
        >
          <div className="w-full grid grid-cols-2 items-center gap-2">
            <p className="text-nowrap overflow-hidden">{task.title}</p>
            <p className="text-gray-600 text-sm text-nowrap overflow-hidden">
              {task.description}
            </p>
          </div>

          <button
            onClick={() => setShowUpdateTask(true)}
            className="hover:bg-gray-200 border border-gray-300 px-1.5 py-1 rounded-md"
          >
            <BsThreeDots />
          </button>

          {/* Update or Delete Task */}
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
                onClick={handleDelete}
                type="button"
                className="bg-[#ffd9d5] hover:bg-[#ffc2bc] text-sm font-medium px-2 py-1 mt-2 rounded-md border-[1.5px] border-gray-300"
              >
                Delete Task
              </button>
            </form>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
