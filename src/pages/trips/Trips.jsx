import Card from "../../components/Card";
import SectionTitle from "../../components/SectionTitle";
import useTrips from "../../hooks/useTrips";
const Trips = () => {
  const [tours] = useTrips();
  return (
    <div className="w-11/12 mx-auto my-28">
      <SectionTitle
        title="Our Exclusive Tour Packages"
        subtitle="Curated packages for unforgettable travel experiences."
      />
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-6">
        {tours.map((tour) => (
          <Card key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default Trips;
