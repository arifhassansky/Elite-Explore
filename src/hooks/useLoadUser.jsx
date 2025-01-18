import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useLoadUser = () => {
  const { user: authUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: user = [], refetch } = useQuery({
    queryKey: ["user", authUser?.email],
    enabled: !!authUser?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${authUser?.email}`);
      return data;
    },
  });

  return [user, refetch];
};

export default useLoadUser;
