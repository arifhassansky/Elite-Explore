import overviewVideo from "../../assets/video/overview.mp4";

const Overview = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="w-11/12 mx-auto px-6 lg:px-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Bangladesh with Confidence
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Discover the beauty, culture, and heritage of Bangladesh through our
            comprehensive travel platform. From majestic landmarks to hidden
            gems, we provide everything you need to plan unforgettable trips.
            Learn about local culture, savor unique cuisine, and find adventure
            with ease.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Video Section */}
          <div className="w-full lg:w-1/2 h-full">
            <video
              className="rounded-lg shadow-lg w-full h-[380px] object-cover"
              controls
              poster="https://i.ibb.co.com/ZYNmQmK/overview.jpg"
            >
              <source src={overviewVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Image Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <img
              src="https://i.ibb.co.com/PcW3mQZ/sajek.png"
              alt="Tourist Attraction 1"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://i.ibb.co.com/zPWPmkK/coxs.jpg"
              alt="Tourist Attraction 2"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://i.ibb.co.com/pWspnym/slider-2.jpg"
              alt="Tourist Attraction 3"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://i.ibb.co.com/X2TvK4B/ahsanmonzil.jpg"
              alt="Tourist Attraction 4"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="text-center mt-12">
          <a
            href="/tourism-guide"
            className="bg-primary text-white px-6 py-3 rounded-md shadow hover:bg-secondary transition-all"
          >
            Start Planning Your Journey Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Overview;
