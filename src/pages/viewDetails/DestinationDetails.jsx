import { Link, useNavigate, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DetailsImgSlider from "./DetailsImgSlider";
import { useEffect, useState } from "react";
import TourGuideCard from "../../components/TourGuideCard";
import BookingModal from "./BookingModal";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiLoader } from "react-icons/fi";
import Confetti from "react-confetti";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const DestinationDetails = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [destination, setDestination] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // fetch tour guides data
  const [guides, setGuides] = useState([]);
  const axiosSecure = useAxiosSecure();

  // showing congrachulations message
  const [showCongrats, setShowCongrats] = useState(false);

  const { data: bookings } = useQuery({
    queryKey: ["bookings"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings/${user?.email}`);
      return data;
    },
  });

  useEffect(() => {
    if (bookings?.length > 3) {
      setShowCongrats(true);
      const timer = setTimeout(() => setShowCongrats(false), 5000);
      return () => clearTimeout(timer); // Cleanup timer on unmount or re-render
    }
  }, [bookings]);

  // load details tours data
  useEffect(() => {
    axiosSecure
      .get(`/details/${id}`)
      .then((res) => {
        setDestination(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [axiosSecure, id]);

  useEffect(() => {
    axiosSecure.get("allGuides").then((res) => setGuides(res.data));
  }, [axiosSecure]);

  // const first handle book now button
  const handleBook = () => {
    if (user) {
      setModalOpen(true);
    } else {
      toast.info("You must login to book a trip!");
      navigate("/login");
    }
  };

  // Handle booking logic
  const handleBookNow = async (bookingDetails) => {
    if (!bookingDetails.tourDate || !bookingDetails.guide) {
      toast.error("Please select a tour date and guide.");
      return;
    }
    // send data to database
    const { data } = await axiosSecure.post("/booking", bookingDetails);
    if (data.insertedId) {
      setModalOpen(false);
      setIsBookingConfirmed(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        <FiLoader className="text-5xl animate-spin text-[#3B9DF8]" />
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto px-8 pt-36 pb-20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        <div>
          <DetailsImgSlider images={destination?.photo} />
        </div>
        <div className="flex flex-col gap-6 lg:gap-8">
          <div>
            <h1 className="text-[1.6rem] lg:text-4xl font-bold text-gray-800">
              {destination.title}
            </h1>
            <div className="flex items-center gap-2 mt-2 lg:mt-5">
              <span className="text-3xl font-medium">৳{destination.price}</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-2xl text-gray-700">
              Description:
            </h2>
            <p className="text-lg text-gray-600 mt-6">
              {destination.description}
            </p>
          </div>

          <div className="text-center w-1/2 mx-auto" onClick={handleBook}>
            <Button text="Book Now!" />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-4xl text-center font-bold mb-6 relative">
          Our Tour Plans
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary mt-2"></span>
        </h3>
        <div className="space-y-6">
          {destination?.tour_plan?.map((plan, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-orange-50 to-white shadow-xl rounded-2xl p-8"
            >
              <span className="text-2xl font-semibold bg-secondary text-white px-6 py-1 rounded-md">
                {plan.day}
              </span>
              <h3 className="text-xl font-semibold text-primary my-4">
                {plan.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {plan.activities}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <h3 className="text-4xl text-center font-bold mb-16 relative">
          Meet Our Expert Tour Guides
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-80 h-1 bg-primary mt-3"></span>
        </h3>
        <div className="grid md:grid-cols-6 gap-x-6 mt-8">
          {guides.map((guide) => (
            <TourGuideCard key={guide._id} guide={guide} />
          ))}
        </div>
      </div>

      {/* Boking modal */}
      {isModalOpen && (
        <BookingModal
          destination={destination}
          guides={guides}
          onClose={() => setModalOpen(false)}
          onBook={handleBookNow}
        />
      )}

      {/* Confirmation Modal */}
      {isBookingConfirmed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Confirm your Booking
            </h3>
            <p className="mb-4">
              Your have successfully booked {""}
              <span className="text-green-600 font-semibold">
                {destination.title}
              </span>
              . Please proceed with the payment to confirm your booking.
            </p>
            <div className="flex justify-around space-x-4">
              <button
                onClick={() => setIsBookingConfirmed(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600"
              >
                Later
              </button>
              <Link
                to="/dashboard/my-bookings"
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg shadow-sm"
              >
                Confirm
              </Link>
              <Link
                to="/dashboard/my-bookings"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600"
              >
                My Bookings
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* show countfetti */}
      {showCongrats && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20">
          <Confetti />
          <div className="flex flex-col items-center px-12 py-6 bg-white backdrop-blur-2xl bg-opacity-10 rounded-lg">
            <img
              className="w-48"
              src="https://i.ibb.co.com/b3qtqmx/wow-Girl-removebg-preview.png"
            />
            <h2 className="text-4xl font-semibold text-primary my-4 ">
              🎉<span className="backdrop-blur-3xl"> Congratulations!</span> 🎉
            </h2>
            <h2 className="text-2xl text-secondary mb-6">
              🎉You got a discount! 🎉
            </h2>
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg"
              onClick={() => toast.success("Discount applied!")}
            >
              Apply Discount
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationDetails;
