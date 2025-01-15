import { useState, useEffect } from "react";
import { FacebookShareButton } from "react-share";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaShareAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import StorySlider from "../../components/StorySlider";

const TouristStories = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/randomStories").then((res) => {
      setStories(res.data);
    });
  }, [axiosPublic]);

  const handleShare = () => {
    if (!user) {
      navigate("/login");
    } else {
      toast.error("You need to set up a shareable link to enable sharing!");
    }
  };

  return (
    <div className="space-y-8 py-16 bg-gray-100">
      <div className="w-10/12 mx-auto">
        <h2 className="text-5xl font-bold text-center mb-20">
          Tourist Stories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stories.map((story) => {
            const images = story.photo || [];

            return (
              <div
                key={story._id}
                className="relative bg-white shadow-lg overflow-hidden"
              >
                {/* Story Slider Component */}
                <StorySlider images={images} />

                {/* Share Icon */}
                <div className="absolute top-4 right-4 flex justify-center items-center p-2 text-white hover:text-black bg-primary hover:bg-white rounded-full duration-300">
                  {user ? (
                    <FacebookShareButton
                      url={`https://EliteExplore.com/stories/${story.id}`}
                      quote={story.title}
                      hashtag="#TouristStory"
                    >
                      <FaShareAlt />
                    </FacebookShareButton>
                  ) : (
                    <button onClick={handleShare}>
                      <FaShareAlt className="text-white" />
                    </button>
                  )}
                </div>

                {/* Persistent Overlay */}
                <div className="absolute inset-0 top-56 bg-black/20 px-2 text-white">
                  <h3 className="text-lg font-semibold ">{story.title}</h3>
                  <p className="leading-tight">{story.excerpt}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => navigate("/all-stories")}
            className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-800 transition"
          >
            All Stories
          </button>
          <button
            onClick={() => navigate("/add-story")}
            className="bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primary-dark transition"
          >
            Add Stories
          </button>
        </div>
      </div>
    </div>
  );
};

export default TouristStories;
