import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useProject = pathname => {
  const axiosSecure = useAxiosSecure();

  const { data: project = {}, refetch } = useQuery({
    queryKey: ['project', pathname],
    queryFn: async () => {
      if (pathname.slice(1)) {
        const { data } = await axiosSecure.get(`/project${pathname}`);
        return data;
      } else {
        return {};
      }
    },
  });

  return { project, refetch };
};

export default useProject;
