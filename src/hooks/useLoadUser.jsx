import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useLoadUser = () => {
  const { user: authUser } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: user = [], refetch } = useQuery({
    queryKey: ["user", authUser?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/user/${authUser?.email}`);
      return data;
    },
  });

  return [user, refetch];
};

export default useLoadUser;
