import Table from "../components/Table"; // Adjust the import path if needed
import SectionTitle from "../components/SectionTitle";
import useBookings from "../hooks/useBookings";

const MyBookings = () => {
  const [bookings, refetch] = useBookings();
  return (
    <div className="px-16 py-8">
      {bookings.length > 0 && (
        <>
          <SectionTitle
            title="My Bookings"
            subtitle="View and manage your upcoming tours and reservations with ease."
          />
        </>
      )}
      <Table data={bookings} refetch={refetch} />
    </div>
  );
};

export default MyBookings;
