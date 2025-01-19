import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGuide = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isGuide, isPending: isGuideLoading } = useQuery({
    queryKey: [`${user?.email},"isGuide`],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/guide/${user?.email}`);
      return data?.Guide;
    },
  });
  return [isGuide, isGuideLoading];
};

export default useGuide;
