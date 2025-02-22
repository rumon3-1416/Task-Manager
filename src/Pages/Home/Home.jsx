import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';

import TaskCard from '../../components/Shared/TaskCard';
import ProjectBar from './ProjectBar';
import useProject from '../../Hooks/useProject';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Home = () => {
  const [localProject, setLocalProject] = useState({});

  const { pathname } = useLocation();
  const { project, refetch, isRefetching, isFetched } = useProject(pathname);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    // console.log(isRefetching);
    isFetched && setLocalProject(project);
  }, [project, isFetched]);

  const onDragEnd = async result => {
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

      // Decrease bottom tasks order
      const orderDecTasks = filteredTasks.map(task =>
        task.order > sourceOrder ? { ...task, order: task.order - 1 } : task
      );

      // Reorder tasks
      const reorderedTasks = orderDecTasks.map(task =>
        task.order >= destOrder ? { ...task, order: task.order + 1 } : task
      );
      reorderedTasks.splice(destOrder - 1, 0, droppedTask);

      // Update UI
      const updatedProject = {
        ...localProject,
        task_categories: [
          ...localProject.task_categories.map(cat => {
            if (cat.category === sourceCat) {
              return { ...cat, tasks: reorderedTasks };
            } else {
              return cat;
            }
          }),
        ],
      };
      setLocalProject(updatedProject);

      // Update in backend
      const { data } = await axiosSecure.patch(
        `/task_same_reorder${pathname}`,
        reorderedTasks
      );
      data?.acknowledged && refetch();
    } else {
      // Source Category Tasks
      const sourceTasks = project.task_categories.find(
        tc => tc.category === sourceCat
      ).tasks;
      // Destination Category Tasks
      const destTasks = project.task_categories.find(
        tc => tc.category === destCat
      ).tasks;

      // Update Dropped Task
      const droppedTask = {
        ...sourceTasks.find(task => task.order === sourceOrder),
        order: destOrder === 0 ? 1 : destOrder,
        category: destCat,
      };

      // Filter Source tasks
      const filteredSourceTasks = sourceTasks.filter(
        task => task.order !== sourceOrder
      );
      // Decrease bottom Source tasks order
      const orderDecSourceTasks = filteredSourceTasks.map(task =>
        task.order > sourceOrder ? { ...task, order: task.order - 1 } : task
      );

      // Increase bottom Destination tasks order
      const orderIncDestTasks = destTasks.map(task =>
        task.order >= destOrder ? { ...task, order: task.order + 1 } : task
      );
      orderIncDestTasks.splice(destOrder - 1, 0, droppedTask);

      // Update UI
      const updatedProject = {
        ...localProject,
        task_categories: [
          ...localProject.task_categories.map(cat => {
            if (cat.category === sourceCat) {
              return { ...cat, tasks: orderDecSourceTasks };
            } else if (cat.category === destCat) {
              return { ...cat, tasks: orderIncDestTasks };
            } else {
              return cat;
            }
          }),
        ],
      };
      setLocalProject(updatedProject);

      // Update in Backend
      const { data } = await axiosSecure.patch(`/task_cat_reorder${pathname}`, {
        source: { category: sourceCat, tasks: orderDecSourceTasks },
        destination: { category: destCat, tasks: orderIncDestTasks },
      });
      data?.result1?.acknowledged && data?.result2?.acknowledged && refetch();
    }
  };

  return (
    <div className="w-full h-full p-4 overflow-y-auto">
      <ProjectBar project={localProject} />

      {/* Task Cards */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {localProject?.task_categories?.map((category, i) => (
            <TaskCard category={category} key={i} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
