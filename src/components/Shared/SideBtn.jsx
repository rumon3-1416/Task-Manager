import React from 'react';

const SideBtn = ({ className = '', onClick: clickFn, children }) => {
  return (
    <button
      onClick={clickFn}
      className={`text-dark hover:bg-teal hover:text-white text-sm font-medium text-nowrap text-left w-full overflow-hidden px-4 py-0.5 rounded-full ${className}`}
    >
      {children}
    </button>
  );
};

export default SideBtn;
