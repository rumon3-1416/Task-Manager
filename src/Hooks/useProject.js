import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useProject = pathname => {
  const axiosSecure = useAxiosSecure();

  const {
    data: projectsTitles = [],
    refetch: refetchTitles,
    isLoading: loadingTitles,
    isRefetching: refetchingTitles,
  } = useQuery({
    queryKey: ['projects_titles'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/projects-titles');
      return data;
    },
  });

  const {
    data: project = {},
    refetch,
    isFetching,
    isRefetching,
    isFetched,
  } = useQuery({
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

  return {
    project,
    refetch,
    isFetched,
    isFetching,
    isRefetching,
    projectsTitles,
    refetchTitles,
    refetchingTitles,
    loadingTitles,
  };
};

export default useProject;
