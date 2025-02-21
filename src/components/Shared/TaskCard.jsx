import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import AddTask from './AddTask';
import Task from './Task';

const TaskCard = ({ category }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <Droppable droppableId={category.category}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          id={category.title}
          className="bg-coralBg h-fit p-2 border-[1.5px] border-gray-300 rounded-md relative"
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
            {category.tasks.map((task, i) => (
              <Task task={task} key={task.time} index={i} />
            ))}
            {provided.placeholder}
          </div>

          {/* Foot */}
          <div className="mt-1">
            <button
              onClick={() => setShowTaskForm(true)}
              className="hover:bg-gray-200 w-full text-left px-2 py-0.5 rounded-md"
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
