import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useLoadUser from "../hooks/useLoadUser";
import Table from "../components/Table"; // Adjust the import path if needed
import SectionTitle from "../components/SectionTitle";

const MyBookings = () => {
  const axiosPublic = useAxiosPublic();
  const [user] = useLoadUser();

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/bookings/${user?.email}`);
      return data;
    },
  });

  return (
    <div className="p-16">
      {bookings.length > 0 && (
        <>
          <SectionTitle
            title="My Bookings"
            subtitle="View and manage your upcoming tours and reservations with ease."
          />
        </>
      )}
      <Table data={bookings} />
    </div>
  );
};

export default MyBookings;
