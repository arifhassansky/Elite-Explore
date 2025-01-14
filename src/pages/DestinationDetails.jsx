import { useLoaderData } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DetailsImgSlider from "../components/DetailsImgSlider";

const DestinationDetails = () => {
  const destination = useLoaderData();

  return (
    <div className="w-11/12 mx-auto px-8 pt-36 pb-20">
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

      {/* accordion */}
      <div className="mt-16">
        <h3 className="text-4xl text-center font-bold underline">
          Our Tour Plans
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {destination?.tour_plan?.map((plan, idx) => (
            <div key={idx}>
              <h2>{plan.day}</h2>
              <h3>{plan.title}</h3>
              <p>{plan.activities}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
