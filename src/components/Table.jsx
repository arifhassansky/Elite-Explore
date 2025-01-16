/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { default as Button } from "./Button";
import { default as SecondBtn } from "./SecondBtn";
import { format } from "date-fns";

const MyBookings = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      {data && data.length > 0 ? (
        <table className="w-full border-collapse bg-white shadow-md">
          <thead className="bg-primary text-gray-200 uppercase text-sm lg:text-md">
            <tr>
              <th className="px-4 py-2">Package</th>
              <th className="px-4 py-2">Guide Name</th>
              <th className="px-4 py-2">Tour Date</th>
              <th className="px-4 py-2">Tour Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-md lg:text-lg">
            {data.map((booking, index) => {
              const formattedTourDate = format(
                new Date(booking.tourDate),
                "dd MMM yyyy"
              );

              return (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{booking.packageName}</td>
                  <td className="px-4 py-2">{booking.guide}</td>
                  <td className="px-4 py-2">{formattedTourDate}</td>
                  <td className="px-4 py-2">{booking.price}</td>
                  <td className="px-4 py-2">{booking.status}</td>
                  <td className="px-4 py-2">
                    <Button text="Pay" />
                  </td>
                  <td className="px-4 py-2">
                    <SecondBtn text="Cancel" />
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
