import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useLoadUser from "../hooks/useLoadUser";
import { FacebookShareButton } from "react-share";
import { FaEdit, FaShareAlt, FaTrash } from "react-icons/fa";
import StorySlider from "../components/StorySlider";
import SectionTitle from "../components/SectionTitle";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageStories = () => {
  const axiosPublic = useAxiosPublic();
  const [user] = useLoadUser();

  const { data: stories = [], refetch } = useQuery({
    queryKey: ["stories", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/stories/${user?.email}`);
      return data;
    },
  });

  const handleDelete = async (id) => {
    const { data } = await axiosPublic.delete(`/stories/${id}`);
    if (data.deletedCount > 0) {
      refetch();
      toast.success("Story deleted successfully");
    } else {
      toast.error("Failed to delete story");
    }
  };

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-2 p-2">
          <p className="text-sm text-gray-700 flex-1">
            Are you sure you want to delete this story?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              onClick={() => {
                handleDelete(id);
                closeToast();
              }}
            >
              Yes
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };

  return (
    <div className="p-16">
      <SectionTitle
        title="Your Stories"
        subtitle="Manage, edit, or delete your added stories"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stories.map((story) => {
          const images = story.photo || [];

          return (
            <div
              key={story._id}
              className="relative bg-white shadow-lg overflow-hidden"
            >
              {/* Story Slider */}
              <StorySlider images={images} />

              {/* Delete Button */}
              <div className="absolute top-4 right-24 flex justify-center items-center p-2 text-orange-600 bg-white hover:bg-black rounded-full duration-300">
                <button onClick={() => confirmDelete(story._id)}>
                  <FaTrash />
                </button>
              </div>

              {/* Edit Button */}
              <div className="absolute top-4 right-14 flex justify-center items-center p-2 hover:text-white bg-white hover:bg-blue-600 rounded-full duration-300">
                <Link to={`/dashboard/edit-story/${story._id}`}>
                  <FaEdit />
                </Link>
              </div>

              {/* Share Button */}
              <div className="absolute top-4 right-4 flex justify-center items-center p-2 text-white hover:text-black bg-primary hover:bg-white rounded-full duration-300">
                <FacebookShareButton
                  url={`https://EliteExplore.com/stories/${story._id}`}
                  quote={story.title}
                  hashtag="#TouristStory"
                >
                  <FaShareAlt />
                </FacebookShareButton>
              </div>

              {/* Story Details */}
              <div className="absolute inset-0 top-60 bg-black/20 px-2 text-white">
                <h3 className="text-lg font-semibold">{story.title}</h3>
                <p className="leading-tight pb-2">{story.excerpt}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageStories;
