import React, { useState } from 'react';
import AddProject from './AddProject/AddProject';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useProject from '../../Hooks/useProject';

const Empty = () => {
  const [showModal, setShowModal] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { refetchTitles } = useProject();

  // Add Project
  const handleAddProject = async e => {
    e.preventDefault();

    const form = e.target;
    const project = {
      title: form.title.value,
      description: form.description.value,
    };

    const { data } = await axiosSecure.post('/project', project);
    data.acknowledged && (setShowModal(false), refetchTitles());
  };

  return (
    <div className="w-full h-full p-10">
      <h2 className="text-2xl font-semibold">No projects Found!</h2>
      <p className="text-lg font-medium mt-2">Add project to manage tasks.</p>
      <div className="w-fit mt-4">
        <button
          onClick={() => setShowModal(true)}
          className={
            'bg-teal hover:bg-coral2 text-white text-sm font-medium text-nowrap px-4 py-0.5 rounded-full text-center hover:scale-105 transition-all duration-200'
          }
        >
          <span className="text-lg">+</span> Add Project
        </button>
      </div>

      <AddProject
        showModal={showModal}
        setShowModal={setShowModal}
        handleAddProject={handleAddProject}
      />
    </div>
  );
};

export default Empty;
