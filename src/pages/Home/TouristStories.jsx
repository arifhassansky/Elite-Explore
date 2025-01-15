import { FacebookShareButton } from "react-share";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaShareAlt } from "react-icons/fa";

const TouristStories = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/stories").then((res) => {
      setStories(res.data);
    });
  }, [axiosPublic]);

  const handleShare = () => {
    if (!user) {
      navigate("/login");
    } else {
      alert("You need to set up a shareable link to enable sharing!");
    }
  };

  return (
    <div className="space-y-8 py-16 bg-gray-100">
      <div className="w-10/12 mx-auto">
        <h2 className="text-5xl font-bold text-center mb-20">
          Tourist Stories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden group"
            >
              {/* Image */}
              <img
                src={story.photo}
                alt={story.title}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-blue-500 bg-opacity-60 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-xl font-semibold text-white">
                  {story.title}
                </h3>
                <p className="text-white leading-relaxed">{story.excerpt}</p>

                {/* Share Icon */}
                <div className="absolute top-4 right-4 hover:bg-white hover:text-primary flex justify-center items-center p-2 bg-gray-200 rounded-full">
                  {user ? (
                    <FacebookShareButton
                      url={`https://EliteExplore.com/stories/${story.id}`}
                      quote={story.title}
                      hashtag="#TouristStory"
                      className="text-white bg-primary p-2 rounded-full shadow hover:bg-primary-dark transition"
                    >
                      <FaShareAlt size={20} />
                    </FacebookShareButton>
                  ) : (
                    <button
                      onClick={handleShare}
                      className="text-white bg-primary p-2 rounded-full shadow hover:bg-primary-dark transition"
                    >
                      <FaShareAlt className="text-white" size={30} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
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
