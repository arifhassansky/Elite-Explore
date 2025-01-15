/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../hooks/useAuth";
import Select from "react-select";
import { FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const BookingModal = ({
  destination,
  guides,
  onClose,
  onBook,
  setIsBookingConfirmed,
}) => {
  const [tourDate, setTourDate] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const { user } = useAuth();
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(true);

  // Handle booking details submission
  const handleSubmit = () => {
    if (!user) {
      toast.error("Please log in to book the tour.");
      return;
    }

    const bookingDetails = {
      packageName: destination.title,
      packageId: destination._id,
      guide: selectedGuide.value,
      tourDate,
      user: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
      price: destination.price,
      status: "pending",
    };

    onBook(bookingDetails);
    setIsFirstModalOpen(false);
  };

  const guideOptions = guides.map((guide) => ({
    value: guide.name,
    label: guide.name,
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Main Booking Modal (First Modal) */}
      {isFirstModalOpen && (
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-[700px] max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Book Your Tour
          </h2>
          <form>
            <div className="mb-1">
              <label className="block text-xs font-medium text-gray-700">
                Package Name
              </label>
              <input
                type="text"
                value={destination.title}
                readOnly
                className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-2 focus:border-[#3B9DF8] transition-colors duration-300"
              />
            </div>

            <div className="mb-1">
              <label className="block text-xs font-medium text-gray-700">
                User Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-2 focus:border-[#3B9DF8] transition-colors duration-300"
              />
            </div>

            <div className="mb-1">
              <label className="block text-xs font-medium text-gray-700">
                User Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-2 focus:border-[#3B9DF8] transition-colors duration-300"
              />
            </div>

            <div className="mb-1">
              <label className="block text-xs font-medium text-gray-700">
                User Image URL
              </label>
              <input
                type="text"
                value={user?.photoURL || ""}
                readOnly
                className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-2 focus:border-[#3B9DF8] transition-colors duration-300"
              />
            </div>

            <div className="mb-1">
              <label className="block text-xs font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                value={destination.price}
                readOnly
                className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-2 focus:border-[#3B9DF8] transition-colors duration-300"
              />
            </div>

            <div className="mb-1">
              <label className="block text-xs font-medium text-gray-700">
                Tour Date
              </label>
              <div className="relative w-full">
                <DatePicker
                  selected={tourDate}
                  onChange={(date) => setTourDate(date)}
                  className="border-[#e5eaf2] border rounded-md outline-none py-2 w-full px-4 focus:border-[#3B9DF8] transition-colors duration-300"
                  placeholderText="Select a date"
                  minDate={new Date()}
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="mb-1">
              <label className="block text-xs font-medium text-gray-700">
                Tour Guide
              </label>
              <Select
                value={selectedGuide}
                onChange={(e) => setSelectedGuide(e)}
                options={guideOptions}
                className="w-full"
                placeholder="Select a guide"
              />
            </div>
          </form>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleSubmit();
                setIsBookingConfirmed(true);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingModal;
