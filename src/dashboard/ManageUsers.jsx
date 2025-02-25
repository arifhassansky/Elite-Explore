import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [roleFilter, setRoleFilter] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const roleOptions = [
    { value: "user", label: "User" },
    { value: "guide", label: "Guide" },
  ];

  const { data: usersData = { users: [], total: 0 }, refetch } = useQuery({
    queryKey: ["users", search, roleFilter, currentPage],
    queryFn: async () => {
      const params = {
        search,
        role: roleFilter?.value || "",
        page: currentPage,
        limit: itemsPerPage,
      };
      const { data } = await axiosSecure.get("/users", { params });
      return data;
    },
  });

  const { users, total } = usersData;
  const totalPages = Math.ceil(total / itemsPerPage);

  const handleReset = () => {
    setSearch("");
    setRoleFilter("");
    setCurrentPage(1);
  };

  const confirmDelete = (user) => {
    toast(
      ({ closeToast }) => (
        <div className="flex items-center justify-between gap-2 p-2">
          <p className="text-sm text-gray-700 flex-1">
            Are you sure delete
            <span className="text-green-600"> {user.name}? </span>
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              onClick={() => {
                handleDelete(user._id);
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
  // delete a user
  const handleDelete = async (id) => {
    const { data } = await axiosSecure.delete(`/delete-user/${id}`);

    if (data.deletedCount > 0) {
      refetch();
      toast.success("User deleted successfully");
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-8 py-6">
      <div className="w-11/12 mx-auto flex-grow">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-center mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              className="p-2 border border-gray-400 rounded-lg focus:border-primary focus:outline-none"
              placeholder="Search by Name/Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="rounded-lg px-1 md:px-4 py-2 bg-primary text-white hover:bg-secondary"
              onClick={() => setCurrentPage(1)}
            >
              Search
            </button>
          </div>

          <div onClick={handleReset}>
            <button className="rounded-lg px-4 py-2 bg-primary text-white hover:bg-secondary">
              Reset
            </button>
          </div>

          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={(option) => {
              setRoleFilter(option);
              setCurrentPage(1);
            }}
            placeholder="Filter by Role"
            className="md:w-1/5"
          />
        </div>

        {/* User Table */}
        <div className="overflow-x-auto rounded-lg max-w-[310px] md:max-w-[620px] lg:max-w-full mx-auto">
          <table className="table-auto w-full text-sm border border-gray-300">
            <thead>
              <tr className="bg-secondary text-white text-base">
                <th className="px-4 py-2 border border-gray-300">Image</th>
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Email</th>
                <th className="px-4 py-2 border border-gray-300">Role</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 text-center border border-gray-300">
                    <img
                      className="w-8 h-8 object-cover rounded-md mx-auto"
                      src={user.photo}
                      alt={user.name}
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {user.role}
                  </td>
                  <td className="px-4 py-2 text-center border border-gray-300">
                    <button
                      onClick={() => confirmDelete(user)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-700 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav className="inline-flex items-center space-x-3">
          <button
            className={`rounded-lg px-4 py-2 bg-primary text-white hover:bg-secondary ${
              currentPage === 1 ? "btn-disabled" : ""
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`rounded-lg px-4 py-2 bg-primary text-white hover:bg-secondary ${
                currentPage === index + 1 ? "btn-active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`rounded-lg px-4 py-2 bg-primary text-white hover:bg-secondary ${
              currentPage === totalPages ? "btn-disabled" : ""
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ManageUsers;
