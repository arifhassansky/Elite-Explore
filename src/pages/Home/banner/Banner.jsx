import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Banner.css";
import "animate.css";

const Banner = () => {
  const banners = [
    {
      id: 1,
      name: "Rangamati",
      text: "Explore the serene beauty of Rangamati",
      images: [
        "https://i.ibb.co.com/6N593Qq/rangamati.jpg",
        "https://i.ibb.co.com/ygPSCJL/rangamati2.jpg",
        "https://i.ibb.co.com/nRHy3kC/rangamati3.jpg",
      ],
    },
    {
      id: 2,
      name: "Bandarban",
      text: "Explore the serene beauty of Bandarban",
      images: [
        "https://i.ibb.co.com/TvPh7jx/bandarban1.jpg",
        "https://i.ibb.co.com/rFyjRRb/bandarban2.jpg",
        "https://i.ibb.co.com/R4pmrJV/bandarban3.jpg",
      ],
    },
    {
      id: 3,
      name: "Cox's Bazar",
      text: "Experience the Charm of Cox's Bazar",
      images: [
        "https://i.ibb.co.com/ssFXrn4/cox1.jpg",
        "https://i.ibb.co.com/MCtjfRC/cox2.jpg",
        "https://i.ibb.co.com/QvVg9px/cox3.jpg",
      ],
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3500);

    return () => clearInterval(slider);
  }, [banners.length]);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  return (
    <section className="banner px-8 h-[80vh]  relative bg-secondary text-white">
      {banners.map(
        (banner, bannerIndex) =>
          bannerIndex === index && (
            <div key={banner.id} className="md:flex items-center h-full">
              <div className="md:w-1/2 px-8 pt-20 md:pt-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold animate__animated animate__fadeInLeft">
                  {banner.name}
                </h1>
                <p className="text-xl py-3 md:text-2xl lg:text-4xl font-medium animate__animated animate__fadeInLeft">
                  {banner.text}
                </p>

                <button className="mt-6">
                  <Link
                    to="/trips"
                    className="relative px-6 py-3 font-bold text-white rounded-lg group"
                  >
                    <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-primary ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-purple-950 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
                    <span className="relative">Explore More</span>
                  </Link>
                </button>
              </div>
              <div className="md:w-1/2 pt-4 md:pt-0 grid grid-cols-3 gap-4 pr-8 animate__animated animate__fadeInRight">
                {banner.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Slide ${bannerIndex + 1} Image ${imgIndex + 1}`}
                    className="w-full h-32 md:h-48 lg:h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )
      )}

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-secondary text-white p-3 rounded-full focus:outline-none"
        onClick={handlePrev}
      >
        &#8249;
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-secondary text-white p-3 rounded-full focus:outline-none"
        onClick={handleNext}
      >
        &#8250;
      </button>
    </section>
  );
};

export default Banner;
