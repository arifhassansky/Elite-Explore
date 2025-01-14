import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useRandomTours = () => {
  const axiosPublic = useAxiosPublic();
  const { data: tours = [], isLoading: loading } = useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tours");
      return res.data;
    },
  });
  return [tours, loading];
};

export default useRandomTours;
