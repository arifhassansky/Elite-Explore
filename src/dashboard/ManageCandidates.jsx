import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../components/SectionTitle";

import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
// import { useEffect, useState } from "react";

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applicants, refetch } = useQuery({
    queryKey: ["applicants"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/applications");
      return data;
    },
  });

  const confirmAccept = (applicant) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-2 p-2">
          <p className="text-sm text-gray-700 flex-1">
            Are you sure want to make
            <span className="text-green-500"> {applicant.name}</span> as a
            guide?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              onClick={() => {
                handleAccept(applicant);
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

  const handleAccept = async (applicant) => {
    const applicantData = {
      email: applicant?.email,
      name: applicant?.name,
      photo: applicant?.photo,
      role: applicant?.role,
      title: applicant?.title,
      contact: applicant?.contact,
      specialty: applicant?.specialty,
      whyTourGuide: applicant?.whyTourGuide,
      cvLink: applicant?.cvLink,
    };
    const { data } = await axiosSecure.patch(
      "/accept-tour-guide",
      applicantData
    );

    console.log(data);
    if (
      data.updateUserStatus.modifiedCount > 0 &&
      data.result.insertedId &&
      data.updateguideStatus.modifiedCount > 0
    ) {
      refetch();
      toast.success(
        `${applicant.name} has been successfully promoted to Tour Guide.`
      );
    }
  };

  // reject the applicant
  const confirmReject = (applicant) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-2 p-2">
          <p className="text-sm text-gray-700 flex-1">
            Are you sure reject
            <span className="text-green-600"> {applicant.name}&apos;s </span>
            applicant?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              onClick={() => {
                handleReject(applicant);
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
  const handleReject = async (applicant) => {
    console.log(applicant);
    const { data } = await axiosSecure.delete(
      `/reject-tour-guide/${applicant?.email}`
    );
    if (data.deletedCount > 0) {
      refetch();
      toast.success(`${applicant.name}'s applicant has been deleted`);
    }
  };

  return (
    <div className="p-12">
      <SectionTitle
        title="Manage Tour Guide applicants"
        subtitle="Review and approve/reject tour guide applicants."
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
            {applicants?.map((applicant) => (
              <tr key={applicant._id}>
                <td>
                  <img
                    className="w-12 h-12 object-cover rounded-md"
                    src={applicant.photo}
                  />
                </td>
                <td>{applicant.name}</td>
                <td>{applicant.email}</td>
                <td>{applicant.role}</td>
                <td>
                  <a
                    href={applicant.cvLink}
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
                    onClick={() => confirmAccept(applicant)}
                    disabled={applicant.role !== "user"}
                  >
                    {applicant.role === "guide" ? "Accepted" : "Accept"}
                  </button>
                  {applicant.role !== "guide" && (
                    <button
                      className="btn btn-sm btn-error text-white ml-2"
                      onClick={() => confirmReject(applicant)}
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
