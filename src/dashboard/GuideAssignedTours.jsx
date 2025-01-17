import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { toast } from "react-toastify";

const GuideAssignedTours = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: tours = [], refetch } = useQuery({
    queryKey: ["tours"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/guides-asigned-tours/${user?.email}`);
      return res.data;
    },
  });

  const handleAccept = async (id) => {
    const { data } = await axiosPublic.patch(`/bookings/${id}`);
    if (data.modifiedCount > 0) {
      refetch();
      toast.success("You have Accepted the booking");
    } else {
      toast.error("Failed to Accept booking");
    }
  };

  const handleReject = async (id) => {
    const { data } = await axiosPublic.patch(`/bookings/${id}`);
    if (data.modifiedCount > 0) {
      refetch();
      toast.success("You have rejected the booking");
    } else {
      toast.error("Failed to reject booking");
    }
  };

  const confirmReject = (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-2 p-2">
          <p className="text-sm text-gray-700 flex-1">
            Are you sure want to reject the tour?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              onClick={() => {
                handleReject(id);
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
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">
        My Assigned Tours
      </h1>
      <div className="overflow-x-auto rounded-lg">
        <table className="table table-zebra w-full ">
          <thead>
            <tr className="bg-secondary text-white ">
              <th>Package Name</th>
              <th>Tourist Name</th>
              <th>Tour Date</th>
              <th>Tour Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours?.map((tour) => (
              <tr key={tour.id}>
                <td>{tour?.packageName}</td>
                <td>{tour?.user?.name}</td>
                <td>{moment(tour.tourDate).format("YYYY-MM-DD")}</td>
                <td>{`$${tour.price}`}</td>
                <td>
                  <span
                    className={`badge ${
                      tour.status === "Pending"
                        ? "badge-warning"
                        : tour.status === "In Review"
                        ? "badge-info"
                        : tour.status === "Accepted"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {tour.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAccept(tour._id)}
                    disabled={tour.status !== "in review"}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => confirmReject(tour._id)}
                    disabled={tour.status === "rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuideAssignedTours;
