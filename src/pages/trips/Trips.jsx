import axios from "axios";
import Card from "../../components/Card";
import SectionTitle from "../../components/SectionTitle";
import useTrips from "../../hooks/useTrips";
import { useEffect, useState } from "react";

const Trips = () => {
  const [tours] = useTrips();
  const [sortedTours, setSortedTours] = useState([]);

  useEffect(() => {
    setSortedTours(tours);
  }, [tours]);

  const handleFilterSubmit = async (sort) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/tours?sort=${sort}`
      );
      setSortedTours(data);
    } catch (error) {
      console.error("Error fetching rooms:", error.message);
    }
  };

  return (
    <div className="w-11/12 mx-auto my-28">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center relative gap-4 md:gap-0">
        <select
          onChange={(e) => handleFilterSubmit(e.target.value)}
          className="select select-error border-2 border-primary focus:outline-none  max-w-xs lg:absolute md:left-10 mb-8"
        >
          <option disabled selected>
            Sort By Price
          </option>
          <option value={"dsc"}>High to low</option>
          <option value={"asc"}>Low to high</option>
        </select>

        <SectionTitle
          title="Our Exclusive Tour Packages"
          subtitle="Curated packages for unforgettable travel experiences."
        />
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
        {sortedTours?.map((tour) => (
          <Card key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default Trips;
