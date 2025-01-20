import { Link } from "react-router-dom";
const EliteAbout = () => {
  return (
    <div className="bg-cover bg-fixed min-h-screen bg-center bg-[url('https://i.ibb.co.com/Tcsx32n/elitebg2.jpg')]">
      <div className="flex flex-col lg:flex-row items-center py-20 px-4 lg:px-16">
        {/* Left Section - Image */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center mb-8 lg:mb-0">
          <div className="bg-gray-100 p-4 rounded-md shadow-2xl">
            <img
              src="https://i.ibb.co.com/v4dWh4V/about-1.jpg"
              alt="Photographer at sunset"
              className="w-96  shadow-lg"
            />
          </div>
          <div className="md:flex gap-12 mt-16">
            <img
              src="https://i.ibb.co.com/rdZw3nS/about-2.jpg"
              alt="Friends enjoying"
              className="w-72 h-40 object-cover border-2 mb-6 border-gray-200 p-2 rounded-lg"
            />
            {/* Video Section */}
            <div className="mt-1">
              <iframe
                title="vimeo-player"
                src="https://player.vimeo.com/video/1048403247?h=d599a83896"
                width="290"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h5 className="text-gray-500 uppercase text-lg font-medium mb-1">
            About Elite Explore
          </h5>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 md:leading-[60px]">
            World Best Travel <br className="hidden md:block" /> Agency Company{" "}
            <br className="hidden md:block" /> Since 2008.
          </h2>
          <p className="text-gray-600 mb-6 leading-loose">
            Elite Explore, established in 2008, is the world’s leading travel
            agency <br className="hidden md:block" /> offering personalized,
            unforgettable tours. We create enriching travel{" "}
            <br className="hidden md:block" /> experiences, ensuring seamless
            adventures and lasting memories <br className="hidden md:block" />{" "}
            for every traveler.
          </p>
          <ul className="text-gray-600 space-y-2 mb-6">
            <li className="flex items-center">
              <span className="w-4 h-4 mr-2 bg-orange-500 rounded-full"></span>
              Expert travel solutions
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 mr-2 bg-orange-500 rounded-full"></span>
              Experinced tour guides
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 mr-2 bg-orange-500 rounded-full"></span>
              Top notch security
            </li>
          </ul>
          <Link
            to="/trips"
            className="px-6 py-3 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600"
          >
            Find Tours
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EliteAbout;
