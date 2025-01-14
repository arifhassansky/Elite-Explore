import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGuides = () => {
  const axiosPublic = useAxiosPublic();
  const { data: guides = [], isLoading: loading } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await axiosPublic.get("/guides");
      return res.data;
    },
  });
  return [guides, loading];
};

export default useGuides;
