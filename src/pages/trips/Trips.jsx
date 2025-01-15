import Card from "../../components/Card";
import useTrips from "../../hooks/useTrips";
const Trips = () => {
  const [tours] = useTrips();
  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-28 gap-6">
      {tours.map((tour) => (
        <Card key={tour._id} tour={tour} />
      ))}
    </div>
  );
};

export default Trips;
