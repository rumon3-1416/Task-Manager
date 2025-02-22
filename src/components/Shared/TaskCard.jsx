import React, { useEffect, useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import AddTask from './AddTask';
import Task from './Task';

const TaskCard = ({ category }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const orderTasks = tasks => {
    const ordered = [];
    tasks.map(task => {
      ordered.splice(task.order - 1, 0, task);
    });
    return ordered;
  };

  return (
    <Droppable droppableId={category.category}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          id={category.title}
          className="bg-coralBg h-fit p-2 border-[1.5px] border-gray-300 rounded-md shadow-md relative"
        >
          {/* Head */}
          <div className="flex justify-between items-center gap-2">
            <h3 className="font-semibold">{category.title}</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTaskForm(true)}
                className="hover:bg-gray-200 text-lg size-6 flex justify-center items-center rounded-md"
              >
                +
              </button>
            </div>
          </div>

          {/* body Tasks */}
          <div>
            {orderTasks(category.tasks).map(task => (
              <Task task={task} key={task.time} index={task.order} />
            ))}
            {provided.placeholder}
          </div>

          {/* Foot */}
          <div className="mt-3">
            <button
              onClick={() => setShowTaskForm(true)}
              className="hover:bg-gray-200 w-full text-left px-2 py-0.5 border-[1.5px] border-gray-300 rounded-md"
            >
              <span className="text-lg">+</span> Add Task
            </button>
          </div>

          {/* Add Task */}
          <AddTask
            task_category={category}
            setShowTaskForm={setShowTaskForm}
            className={`top-2 right-4 ${showTaskForm ? '' : 'hidden'}`}
          />
        </div>
      )}
    </Droppable>
  );
};

export default TaskCard;
