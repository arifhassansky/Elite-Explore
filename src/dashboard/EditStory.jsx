import { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { imageUpload } from "../utils/ImageBbUpload";
import Button from "../components/Button";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

const EditStory = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [images, setImages] = useState([]); // New images (uploaded by the user)
  const [imageLinks, setImageLinks] = useState([]); // Existing images (from the backend)
  const [removedPhotos, setRemovedPhotos] = useState([]); // Images to be removed
  const [initialImageLinks, setInitialImageLinks] = useState([]);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming story ID is passed in the URL

  useEffect(() => {
    const fetchStoryData = async () => {
      const { data } = await axiosPublic.get(`/story/${id}`);
      if (data) {
        setTitle(data.title);
        setExcerpt(data.excerpt);
        setImageLinks(data.photo);
        setInitialImageLinks(data.photo); // Store the initial images
      }
    };
    fetchStoryData();
  }, [id, axiosPublic]);

  // Handle selecting new images
  const handleImageChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setImages([...images, ...filesArray]); // Add new images
  };

  // Handle deleting images (either new or existing)
  const handleImageDelete = (index, isExisting) => {
    const newImages = [...images];
    const newImageLinks = [...imageLinks];

    if (isExisting) {
      // Add to removed photos if it's an existing image
      const removedPhoto = newImageLinks[index];
      setImageLinks(newImageLinks.filter((_, i) => i !== index));
      setRemovedPhotos((prevRemovedPhotos) => [
        ...prevRemovedPhotos,
        removedPhoto,
      ]);
    } else {
      // Remove from the new images array if it's a newly uploaded image
      setImages(newImages.filter((_, i) => i !== index));
    }
  };

  // Handle form submission (update story)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newImageUrls = await Promise.all(
      images.map((image) => imageUpload(image))
    );

    const removedPhotos = initialImageLinks.filter(
      (link) => !imageLinks.includes(link)
    );

    const storyData = {
      title,
      excerpt,
      newPhotos: newImageUrls,
      removedPhotos,
    };

    try {
      const { data } = await axiosPublic.put(`/update-story/${id}`, storyData);

      if (data.message) {
        toast.success(data.message);
        navigate("/dashboard/manage-stories");
      } else {
        toast.error(data.error || "Failed to update story");
      }
    } catch (error) {
      console.error("Error updating story:", error);
      toast.error("Failed to update story");
    }
  };
  return (
    <div className="max-w-2xl mx-auto my-3 px-10 py-4 border rounded-xl shadow-2xl">
      <h2 className="text-2xl font-semibold mb-2 text-center uppercase">
        Edit Your Story
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
              Click to Upload Photos (Multiple allowed)
            </p>
          </div>
        </div>

        {/* Display images */}
        {(imageLinks.length > 0 || images.length > 0) && (
          <div className="flex gap-4 mt-4 overflow-x-auto">
            {/* Display existing images */}
            {imageLinks.map((imageLink, index) => (
              <div key={index} className="relative w-[100px] h-[100px]">
                <img
                  src={imageLink}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <MdDelete
                  className="text-[1.5rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                  onClick={() => handleImageDelete(index, true)} // Delete existing image
                />
              </div>
            ))}

            {/* Display newly uploaded images */}
            {images.map((image, index) => (
              <div key={index} className="relative w-[100px] h-[100px]">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`new-preview-${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <MdDelete
                  className="text-[1.5rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                  onClick={() => handleImageDelete(index, false)} // Delete new image
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <Button text="Update Story" />
        </div>
      </form>
    </div>
  );
};

export default EditStory;
