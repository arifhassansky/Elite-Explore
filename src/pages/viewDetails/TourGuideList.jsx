import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const TourGuideList = () => {
  const [guides, setGuides] = useState([]);
  const axiosPublic = useAxiosPublic();
  console.log(guides);
  useEffect(() => {
    axiosPublic.get("allGuides").then((res) => setGuides(res.data));
  }, [axiosPublic]);

  return (
    <div className="grid grid-cols-2 gap-x-56 gap-y-4">
      {guides.map((guide) => (
        <Link
          to={`/tour-guide/${guide._id}`}
          key={guide._id}
          className="flex items-center space-x-4 p-4 rounded-lg border-l-2 border-blue-400 hover:bg-orange-50 transition"
        >
          <img
            src={guide.photo}
            alt={guide.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-medium">{guide.name}</h3>
            <p className="text-md text-gray-500">{guide.specialty}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TourGuideList;
