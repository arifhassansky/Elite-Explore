import { useLoaderData } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DetailsImgSlider from "./DetailsImgSlider";
import TourGuideList from "./TourGuideList";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TourGuideCard from "../../components/TourGuideCard";

const DestinationDetails = () => {
  const destination = useLoaderData();

  // fetch tour guides data
  const [guides, setGuides] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("allGuides").then((res) => setGuides(res.data));
  }, [axiosPublic]);

  return (
    <div className="w-11/12 mx-auto px-8 pt-36 pb-20">
      {/* package Details */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left side - Image */}
        <div>
          <DetailsImgSlider images={destination?.photo} />
        </div>

        {/* Right side - Details */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <div>
            <h1 className="text-[1.6rem] lg:text-4xl font-bold text-gray-800">
              {destination.title}
            </h1>
            <div className="flex items-center gap-2 mt-2 lg:mt-5">
              <span className="text-3xl font-medium">৳{destination.price}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold text-2xl text-gray-700">
                Description:
              </h2>
              <p className="text-lg text-gray-600 mt-6">
                {destination.description}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div>
            <button className="w-full py-3 px-4 rounded-lg bg-primary text-white hover:bg-secondary">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Tour plans*/}
      <div className="mt-16">
        <h3 className="text-4xl text-center font-bold mb-6 relative">
          Our Tour Plans
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary mt-2"></span>
        </h3>
        <div className="space-y-6">
          {destination?.tour_plan?.map((plan, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-orange-50 to-white shadow-xl rounded-2xl p-8"
            >
              <span className="text-2xl font-semibold bg-secondary text-white px-6 py-1 rounded-md">
                {plan.day}
              </span>
              <h3 className="text-xl font-semibold text-primary my-4">
                {plan.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {plan.activities}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* all guides */}
      <div className="mt-28">
        <h3 className="text-4xl text-center font-bold mb-16 relative">
          Meet Our Expert Tour Guides
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-80 h-1 bg-primary mt-3"></span>
        </h3>

        <div className="grid md:grid-cols-6 gap-x-6 mt-8">
          {guides.map((guide) => (
            <TourGuideCard key={guide._id} guide={guide} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
