import React from 'react';

const Empty = () => {
  return (
    <div className="w-full h-full p-4">
      <h2 className="text-2xl font-semibold">No projects Found!</h2>
      <p className="text-lg font-medium mt-2">Add project to manage tasks.</p>
    </div>
  );
};

export default Empty;
