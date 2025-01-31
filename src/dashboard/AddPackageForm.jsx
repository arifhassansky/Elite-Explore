import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { imageUpload } from "../utils/ImageBbUpload";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddPackageForm = () => {
  const axiosSecure = useAxiosSecure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tourType, setTourType] = useState("");
  const [images, setImages] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);
  const [tourPlan, setTourPlan] = useState([
    { day: "", title: "", activities: "" },
  ]);

  // Handle selecting images
  const handleImageChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    const newImageLinks = filesArray.map((file) => URL.createObjectURL(file));

    setImages([...images, ...filesArray]);
    setImageLinks([...imageLinks, ...newImageLinks]);
  };

  // Handle deleting an image
  const handleImageDelete = (index) => {
    const newImages = [...images];
    const newImageLinks = [...imageLinks];
    newImages.splice(index, 1);
    newImageLinks.splice(index, 1);

    setImages(newImages);
    setImageLinks(newImageLinks);
  };

  // Handle tour plan input change
  const handleTourPlanChange = (index, field, value) => {
    const updatedTourPlan = [...tourPlan];
    updatedTourPlan[index][field] = value;
    setTourPlan(updatedTourPlan);
  };

  const handleAddTourDay = () => {
    setTourPlan([...tourPlan, { day: "", title: "", activities: "" }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload images to get URLs
      const uploadedImageUrls = await Promise.all(
        images.map((image) => imageUpload(image))
      );

      const packageData = {
        title,
        description,
        price: parseInt(price),
        tourType,
        photo: uploadedImageUrls,
        tour_plan: tourPlan,
      };

      // Send the package data to the backend
      const { data } = await axiosSecure.post("/add-package", packageData);
      if (data.insertedId) {
        toast.success("Package added successfully!");
        setTitle("");
        setDescription("");
        setPrice("");
        setTourType("");
        setImages([]);
        setImageLinks([]);
        setTourPlan([{ day: "", title: "", activities: "" }]);
      } else {
        toast.error("Failed to add package. Please try again.");
      }
    } catch (error) {
      console.error("Error adding package:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="px-6 py-4">
      <div className="max-w-2xl mx-auto px-4 py-2 border rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-2 text-center uppercase">
          Add a New Package
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="mb-1 col-span-2 md:col-span-1">
              <label className="block font-semibold  mb-1">Title*</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-gray-300 border rounded-lg outline-none px-3 w-full py-2 focus:border-primary transition-colors duration-300 "
                placeholder="Enter package title"
                required
                maxLength="100"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block font-semibold  mb-1">Price*</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border-gray-300 border rounded-lg outline-none px-3 w-full py-2 focus:border-primary transition-colors duration-300 "
                placeholder="Enter package price"
                required
                min="1"
              />
            </div>
            <div className="col-span-2">
              <label className="block font-semibold  mb-1">Description*</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-gray-300 border rounded-lg outline-none px-3 w-full py-2 focus:border-primary transition-colors duration-300 "
                rows="2"
                placeholder="Enter package description"
                required
                maxLength="500"
              ></textarea>
            </div>
            {/* Tour Type Selection */}
            <div className="col-span-2">
              <label className="block font-semibold  mb-1">Tour Type*</label>
              <select
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
                className="border-gray-300 border rounded-lg outline-none px-3 w-full py-2 focus:border-primary transition-colors duration-300 "
                required
              >
                <option value="">Select Tour Type</option>
                <option value="Adventure">Adventure</option>
                <option value="Cultural">Cultural</option>
                <option value="Relaxation">Relaxation</option>
                <option value="Nature">Nature</option>
                <option value="Historical">Historical</option>
                {/* Add more tour types as needed */}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block font-semibold  mb-1">Upload Images</label>
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
                multiple
              />
              <div
                className="w-full flex items-center justify-center flex-col gap-2 border-gray-300 border rounded-lg py-2 cursor-pointer"
                onClick={() => document.getElementById("image").click()}
              >
                <FiUpload className="text-[1.5rem] text-primary" />
                <p className=" text-gray-500">
                  Click to Upload Photos (Multiple allowed)
                </p>
              </div>
            </div>
          </div>

          {/* Displaying uploaded image previews */}
          {imageLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {imageLinks.map((imageLink, index) => (
                <div key={index} className="relative w-[80px] h-[80px]">
                  <img
                    src={imageLink}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded-sm"
                  />
                  <MdDelete
                    className="text-[1rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                    onClick={() => handleImageDelete(index)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Tour Plan */}
          <div className="mt-3">
            <h3 className="font-semibold  mb-2">Tour Plan</h3>
            {tourPlan.map((dayPlan, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-2 md:grid-cols-3 mb-3"
              >
                <input
                  type="text"
                  value={dayPlan.day}
                  onChange={(e) =>
                    handleTourPlanChange(index, "day", e.target.value)
                  }
                  placeholder="Day no"
                  className="border-gray-300 border rounded-lg outline-none px-3 py-2 focus:border-primary transition-colors duration-300 "
                  required
                  maxLength="50"
                />
                <input
                  type="text"
                  value={dayPlan.title}
                  onChange={(e) =>
                    handleTourPlanChange(index, "title", e.target.value)
                  }
                  placeholder="Title"
                  className="border-gray-300 border rounded-lg outline-none px-3 py-2 focus:border-primary transition-colors duration-300 "
                  required
                  maxLength="100"
                />
                <textarea
                  value={dayPlan.activities}
                  onChange={(e) =>
                    handleTourPlanChange(index, "activities", e.target.value)
                  }
                  placeholder="Activities"
                  className="border-gray-300 border rounded-lg outline-none px-3 py-2 focus:border-primary transition-colors duration-300 "
                  rows="2"
                  required
                  maxLength="500"
                ></textarea>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTourDay}
              className="w-full bg-secondary text-white py-2 rounded-lg mt-2 "
            >
              Add More Tour Days
            </button>
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-green-700 transition "
            >
              Add Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackageForm;
