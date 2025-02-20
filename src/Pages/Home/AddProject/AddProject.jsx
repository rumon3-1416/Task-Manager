import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const AddProject = ({ showModal, setShowModal, handleAddProject }) => {
  useEffect(() => {
    showModal && (document.body.style.overflow = 'hidden');
    !showModal && (document.body.style.overflow = 'auto');

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  return showModal ? (
    <div className="bg-[#00000053] w-full min-h-screen backdrop-blur-sm fixed inset-x-0 top-0 z-20 flex justify-center items-center">
      <form
        onSubmit={handleAddProject}
        className="bg-white w-[90%] max-w-xl px-4 py-6 mt-9 rounded-xl flex flex-col gap-4 relative"
      >
        {/* Close Modal */}
        <button
          onClick={() => setShowModal(false)}
          type="button"
          className="hover:bg-gray-200 text-2xl size-8 rounded-md flex justify-center items-center absolute top-3 right-3"
        >
          <IoClose />
        </button>

        <h2 className="text-xl font-semibold text-center">Add Project</h2>

        {/* Form */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-sm" htmlFor="title">
            Title
          </label>
          <input
            className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-md outline-none border-[1.5px] border-white focus:border-teal transition-all duration-200"
            type="text"
            id="title"
            name="title"
            placeholder="Project Title"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium text-sm" htmlFor="description">
            Description<span className="font-normal">(optional)</span>
          </label>
          <textarea
            className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-md outline-none border-[1.5px] border-white focus:border-teal resize-none transition-all duration-200"
            rows={4}
            name="description"
            id="description"
            placeholder="Project Description"
          ></textarea>
        </div>

        <button
          className="text-white bg-teal hover:bg-coral font-medium text-nowrap text-left mx-auto px-6 py-1 rounded-full "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  ) : (
    <></>
  );
};

export default AddProject;
