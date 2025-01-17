import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionTitle from "../components/SectionTitle";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const ManageCandidates = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch applications from the backend
  const { data: applications, refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/applications");
      return data;
    },
  });

  const confirmAccept = (application) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-2 p-2">
          <p className="text-sm text-gray-700 flex-1">
            Are you sure want to make
            <span className="text-green-500"> {application.name}</span> as a
            guide?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              onClick={() => {
                handleAccept(application);
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

  const handleAccept = async (application) => {
    const { data } = await axiosPublic.patch(
      `/accept-tour-guide/${application?.email}`
    );
    if (data.modifiedCount > 0) {
      refetch();
      toast.success(
        `${application.name} has been successfully promoted to Tour Guide.`
      );
    }
  };

  // reject the application
  const confirmReject = (application) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-2 p-2">
          <p className="text-sm text-gray-700 flex-1">
            Are you sure reject
            <span className="text-green-600"> {application.name}&apos;s </span>
            application?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              onClick={() => {
                handleReject(application);
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
  const handleReject = async (application) => {
    console.log(application);
    const { data } = await axiosPublic.delete(
      `/reject-tour-guide/${application?.email}`
    );
    if (data.deletedCount > 0) {
      refetch();
      toast.success(`${application.name}'s application has been deleted`);
    }
  };

  return (
    <div className="p-12">
      <SectionTitle
        title="Manage Tour Guide Applications"
        subtitle="Review and approve/reject tour guide applications."
      />

      <div className="overflow-x-auto rounded-lg">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-secondary text-white">
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>CV Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications?.map((application) => (
              <tr key={application._id}>
                <td>
                  <img
                    className="w-12 h-12 object-cover rounded-md"
                    src={application.photo}
                  />
                </td>
                <td>{application.name}</td>
                <td>{application.email}</td>
                <td>{application.role}</td>
                <td>
                  <a
                    href={application.cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 font-semibold"
                  >
                    View CV
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-success text-white"
                    onClick={() => confirmAccept(application)}
                    disabled={application.role !== "user"}
                  >
                    {application.role === "guide" ? "Accepted" : "Accept"}
                  </button>
                  {application.role !== "guide" && (
                    <button
                      className="btn btn-sm btn-error text-white ml-2"
                      onClick={() => confirmReject(application)}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCandidates;
