import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import AddTask from '../../components/Shared/AddTask';
import { useLocation } from 'react-router-dom';
import useProject from '../../Hooks/useProject';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ProjectBar = ({ project }) => {
  const projectRef = useRef(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { pathname } = useLocation();
  const { refetch, refetchTitles } = useProject(pathname);

  // handle Outside Click
  useEffect(() => {
    const handleClick = e => {
      if (!projectRef.current.contains(e.target)) {
        setShowProjectForm(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Update Project
  const handleUpdateProject = async e => {
    e.preventDefault();
    const form = e.target;
    const updatedProject = {
      title: form.title.value,
      description: form.description.value,
    };

    const { data } = await axiosSecure.patch(
      `/project${pathname}`,
      updatedProject
    );

    data.acknowledged &&
      (form.reset(), setShowProjectForm(false), refetch(), refetchTitles());
  };

  // Delete Project
  const deleteProject = async () => {
    const { data } = await axiosSecure.delete(`/project${pathname}`);
    data.acknowledged &&
      (setShowProjectForm(false), refetch(), refetchTitles());
  };

  return (
    <div className="mb-6 flex justify-between items-center gap-4 relative">
      <h2 className="font-semibold text-xl">{project.title}</h2>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowTaskForm(true)}
          className="hover:bg-gray-200 font-medium text-left px-2 py-0.5 h-9 rounded-md border-[1.5px] border-gray-300"
        >
          <span className="text-lg">+</span> Add Task
        </button>
        <button
          onClick={() => setShowProjectForm(true)}
          className="hover:bg-gray-200 text-lg px-2 py-1 h-9 rounded-md border-[1.5px] border-gray-300"
        >
          <BsThreeDots />
        </button>
      </div>

      {/* Update Form */}
      <div
        ref={projectRef}
        className={`bg-gray-50 p-3 border-[1.5px] border-gray-300 rounded-md shadow-lg absolute top-8 right-0 z-10 ${
          showProjectForm ? '' : 'hidden'
        }`}
      >
        <form onSubmit={handleUpdateProject} className="text-sm flex flex-col">
          {/* Title */}
          <label className="font-medium" htmlFor="title">
            Title
          </label>
          <input
            className="px-2 py-0.5 mb-3 text-sm border-[1.5px] border-gray-300 rounded-md outline-none"
            type="text"
            name="title"
            id="title"
            placeholder="Project Title"
            defaultValue={project.title}
            maxLength={50}
            required
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
            placeholder="Project Description"
            defaultValue={project.description}
            rows={3}
            maxLength={200}
          />

          <button
            type="submit"
            className="bg-teal3 hover:bg-teal2 text-sm font-medium px-2 py-1 rounded-md border-[1.5px] border-gray-300"
          >
            Update Project
          </button>
          <button
            onClick={deleteProject}
            type="button"
            className="bg-[#ffd9d5] hover:bg-[#ffc2bc] text-sm font-medium px-2 py-1 mt-2 rounded-md border-[1.5px] border-gray-300"
          >
            Delete Project
          </button>
        </form>
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
