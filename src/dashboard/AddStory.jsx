import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { imageUpload } from "../utils/ImageBbUpload";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddStory = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [images, setImages] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Handle selecting image
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrls = await Promise.all(
      images.map((image) => imageUpload(image))
    );

    const resetForm = () => {
      setTitle("");
      setExcerpt("");
      setImages([]);
      setImageLinks([]);
    };

    const storyData = {
      title,
      excerpt,
      photo: imageUrls,
      name: user?.displayName,
      email: user?.email,
    };
    const { data } = await axiosSecure.post("/add-story", storyData);
    if (data.insertedId) {
      toast.success("Story added successfully");
      resetForm();
      navigate("/dashboard/manage-stories");
    } else {
      toast.error("Failed to add story");
    }
  };

  return (
    <div className="p-12">
      <div className="max-w-xl mx-auto my-3 px-10 py-4 border rounded-xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-2 text-center uppercase">
          Add Your Beautiful Story
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-300 border rounded-xl outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
              placeholder="Enter story title"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Description*</label>
            <textarea
              value={excerpt}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setExcerpt(e.target.value);
                }
              }}
              className="border-gray-300 border rounded-xl outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
              rows="4"
              placeholder="Write your story description here (Max 100 characters)"
              required
            ></textarea>
            <p className="text-sm text-gray-500">
              {excerpt.length}/100 characters
            </p>
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Upload Images</label>
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
              multiple
            />
            <div
              className="w-full flex items-center justify-center flex-col gap-4 border-gray-300 border rounded-xl py-4 cursor-pointer"
              onClick={() => document.getElementById("image").click()}
            >
              <FiUpload className="text-[2rem] text-primary" />
              <p className="text-[#777777]">
                CLick to Upload Photos (Multiple allowed)
              </p>
            </div>
          </div>

          {/* Displaying the uploaded image previews */}
          {imageLinks.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {imageLinks.map((imageLink, index) => (
                <div key={index} className="relative w-[100px] h-[100px]">
                  <img
                    src={imageLink}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <MdDelete
                    className="text-[1.5rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                    onClick={() => handleImageDelete(index)}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-4">
            <Button text="Add Story" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStory;
