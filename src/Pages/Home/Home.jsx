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
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceCat = source.droppableId;
    const destCat = destination.droppableId;
    const sourceOrder = source.index;
    const destOrder = destination.index;

    if (sourceCat === destCat) {
      const tasks = project.task_categories.find(
        tc => tc.category === sourceCat
      ).tasks;

      // Update Dropped Task
      const droppedTask = {
        ...tasks.find(task => task.order === sourceOrder),
        order: destOrder,
      };

      // Filter remaining tasks
      const filteredTasks = tasks.filter(task => task.order !== sourceOrder);

      // Increase bottom tasks order
      const orderIncTasks = filteredTasks.map(task =>
        task.order > sourceOrder ? { ...task, order: task.order - 1 } : task
      );

      // Reorder tasks
      const reorderedTasks = orderIncTasks.map(task =>
        task.order >= destOrder ? { ...task, order: task.order + 1 } : task
      );
      reorderedTasks.splice(destOrder - 1, 0, droppedTask);

      console.log(reorderedTasks);
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
