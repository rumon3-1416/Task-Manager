import React from 'react';
import { useLocation } from 'react-router-dom';
import TaskCard from '../../components/Shared/TaskCard';

import ProjectBar from './ProjectBar';
import useProject from '../../Hooks/useProject';

const Home = () => {
  const { pathname } = useLocation();

  const { project } = useProject(pathname);

  return (
    <div className="w-full h-full p-4">
      <ProjectBar project={project} />

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {project?.task_categories?.map((category, i) => (
          <TaskCard category={category} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Home;
