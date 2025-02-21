import React from 'react';
import { useLocation } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';

import TaskCard from '../../components/Shared/TaskCard';
import ProjectBar from './ProjectBar';
import useProject from '../../Hooks/useProject';

const Home = () => {
  const { pathname } = useLocation();
  const { project } = useProject(pathname);

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      console.log(source.droppableId, source.index, destination.index);
    } else {
      console.log(
        source.droppableId,
        source.index,
        destination.droppableId,
        destination.index
      );
    }
  };

  return (
    <div className="w-full h-full p-4 overflow-y-auto">
      <ProjectBar project={project} />

      {/* Task Cards */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project?.task_categories?.map((category, i) => (
            <TaskCard category={category} key={i} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
