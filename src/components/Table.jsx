/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { default as Button } from "./Button";
import { format } from "date-fns";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBookings = ({ data, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const confirmCancel = (booking) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-2 p-2">
          <p className="text-sm text-gray-700 flex-1">
            Are you sure cancel your
            <span className="text-green-600"> {booking.packageName} </span>
            booking?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              onClick={() => {
                handleCancel(booking);
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
  const handleCancel = async (booking) => {
    const { data } = await axiosSecure.delete(`/booking/${booking?._id}`);
    if (data.deletedCount > 0) {
      refetch();
      toast.success(`${booking.packageName}'s application has been deleted`);
    }
  };
  return (
    <div className="overflow-x-auto rounded-lg">
      {data && data.length > 0 ? (
        <table className="table table-zebra border-collapse">
          <thead className="bg-secondary text-gray-200 uppercase">
            <tr>
              <th className="px-4 py-3">Package</th>
              <th className="px-4 py-3">Guide Name</th>
              <th className="px-4 py-3">Tour Date</th>
              <th className="px-4 py-3">Tour Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-md ">
            {data.map((booking, index) => {
              const formattedTourDate = format(
                new Date(booking.tourDate),
                "dd MMM yyyy"
              );

              return (
                <tr key={index}>
                  <td className="px-4 py-2">{booking.packageName}</td>
                  <td className="px-4 py-2">{booking.guide.name}</td>
                  <td className="px-4 py-2">{formattedTourDate}</td>
                  <td className="px-4 py-2">{booking.price}</td>
                  <td className="px-4 py-2">{booking.status}</td>
                  <td className="px-4 py-2">
                    {data.length && booking.status === "pending" ? (
                      <Link
                        to={`/dashboard/payment/${booking._id}`}
                        className="btn bg-green-500 text-white hover:bg-green-700"
                      >
                        Pay
                      </Link>
                    ) : (
                      <Link
                        className="btn bg-green-500 text-white hover:bg-green-700"
                        disabled
                      >
                        Pay
                      </Link>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => confirmCancel(booking)}
                      className="btn bg-red-500 text-white hover:bg-red-700"
                      disabled={booking.status !== "pending"}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center">
          <div className="text-center">
            <p className="text-primary text-4xl font-bold mb-4">
              No Bookings Found
            </p>
            <p className="text-gray-600 text-lg">
              You haven&apos;t made any room bookings yet. Explore our available
              rooms and make your first booking today!
            </p>
            <div className="mt-6 w-1/3 mx-auto">
              <Link to="/trips">
                <Button text="Explore Tours" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
