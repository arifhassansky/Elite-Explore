import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useLoadUser from "./useLoadUser";

const useBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [user] = useLoadUser();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings/${user?.email}`);
      return data;
    },
  });
  return [bookings, refetch];
};

export default useBookings;
