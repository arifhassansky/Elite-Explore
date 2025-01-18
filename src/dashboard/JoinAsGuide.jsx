import { useState } from "react";
import useLoadUser from "../hooks/useLoadUser";
import useAxiosSecure from "../hooks/useAxiosSecure";

const JoinAsGuide = () => {
  const axiosSecure = useAxiosSecure();
  const [user] = useLoadUser();
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDestination] = useState("");
  const [whyTourGuide, setWhyTourGuide] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationInfo = {
      email: user?.email,
      name: user?.name,
      photo: user?.photo,
      role: user?.role,
      title,
      contact: phone,
      specialty: designation,
      whyTourGuide,
      cvLink,
    };
    const { data } = await axiosSecure.post("/applications", applicationInfo);
    if (data.insertedId) {
      setShowModal(true);
      setTitle("");
      setPhone("");
      setDestination("");
      setWhyTourGuide("");
      setCvLink("");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-2">
          Become a Tour Guide
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Share your passion for traveling and show others the wonders of our
          beautiful and diverse world.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-3 w-full">
            <div className="w-1/2">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Application Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                placeholder="Enter your application title"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Phone*
              </label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <div className="w-1/2">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                placeholder="Write your speciality"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                CV Link
              </label>
              <input
                type="url"
                value={cvLink}
                onChange={(e) => setCvLink(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                placeholder="Paste your CV link here"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Why do you want to be a Tour Guide?
            </label>
            <textarea
              value={whyTourGuide}
              onChange={(e) => setWhyTourGuide(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
              placeholder="Write a brief description"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary transition duration-300"
            >
              Submit Application
            </button>
          </div>
        </form>

        {/* Modal for Success Message */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl w-1/3 text-center">
              <h3 className="text-2xl font-semibold text-green-500">
                Application Successful!
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Your application has been submitted successfully. We&apos;ll
                review your application and get back to you soon!
              </p>
              <button
                onClick={closeModal}
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinAsGuide;
