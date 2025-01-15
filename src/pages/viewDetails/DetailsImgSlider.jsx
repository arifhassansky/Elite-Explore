/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const DetailsImgSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div>
      {/* Image Gallery */}
      <div className="w-2/3 mx-auto">
        {/* Main Image Section */}
        <div className="relative aspect-square">
          {/* Tags */}
          <div className="absolute top-4 left-4 z-10 space-y-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-black text-white">
              NEW
            </span>
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-emerald-500 text-white">
              -50%
            </span>
          </div>

          {/* Main Image with Navigation */}
          <div className="relative h-full">
            <img
              src={images[currentImageIndex]}
              alt={`Product view ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-[#0FABCA] hover:text-white"
              aria-label="Previous image"
            >
              <BiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-[#0FABCA] hover:text-white"
              aria-label="Next image"
            >
              <BiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Thumbnail Section */}
        <div className="flex gap-4 justify-between mt-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative transition-all duration-300 w-[8rem] aspect-square ${
                currentImageIndex === index
                  ? "ring-2 ring-[#0FABCA]"
                  : "hover:ring-2 hover:ring-[#0FABCA]"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsImgSlider;
