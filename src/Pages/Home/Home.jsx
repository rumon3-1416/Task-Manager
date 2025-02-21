import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import TaskCard from '../../components/Shared/TaskCard';

const Home = ({ currentId }) => {
  const axiosSecure = useAxiosSecure();

  const { data: project = {} } = useQuery({
    queryKey: ['project', currentId],
    queryFn: async () => {
      if (currentId) {
        const { data } = await axiosSecure.get(`/project/${currentId}`);
        return data;
      } else {
        return {};
      }
    },
  });

  return (
    <div className="w-full h-full p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {project?.task_categories?.map((task, i) => (
          <TaskCard task={task} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Home;
