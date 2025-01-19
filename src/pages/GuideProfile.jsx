import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";

const GuideProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: guide = {} } = useQuery({
    queryKey: ["guide", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/guide/${id}`);
      return data;
    },
  });

  return (
    <div className="my-28">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={guide.photo}
            alt={guide.name}
            className="w-36 h-36 md:w-48 md:h-48 object-cover rounded-full border-4 border-green-500"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{guide.name}</h1>
            <p className="text-xl text-green-600">{guide.specialty}</p>
            <p className="mt-4 text-gray-600 leading-relaxed">{guide.bio}</p>
            <div className="mt-6 space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Experience:</strong> {guide.experience}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Rating:</strong> {guide.rating}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Contact:</strong> {guide.contact}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Email:</strong> {guide.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;
