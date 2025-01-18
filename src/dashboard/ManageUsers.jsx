import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [roleFilter, setRoleFilter] = useState(null);
  const [search, setSearch] = useState("");

  const roleOptions = [
    { value: "user", label: "User" },
    { value: "guide", label: "Guide" },
  ];

  // Query to fetch users with search and role filters
  const { data: users = [] } = useQuery({
    queryKey: ["users", search, roleFilter],
    queryFn: async () => {
      const params = {
        search: search,
        role: roleFilter?.value || "",
      };
      const { data } = await axiosSecure.get("/users", { params });
      return data;
    },
  });

  const handleReset = () => {
    setSearch("");
    setRoleFilter("");
  };

  return (
    <div className="p-12">
      <SectionTitle
        title="User Management"
        subtitle="Efficiently manage and monitor user roles and information."
      />
      <div className="w-11/12 mx-auto">
        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-1">
            <input
              type="text"
              className="p-3 border border-gray-400 rounded-xl focus:border-primary focus:outline-none"
              placeholder="Search by Name/Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn bg-primary text-white hover:bg-secondary">
              Search
            </button>
          </div>

          <div onClick={handleReset}>
            <Button text="Reset" />
          </div>

          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={setRoleFilter}
            placeholder="Filter by Role"
            className="w-1/6"
          />
        </div>

        {/* User Table */}
        <div className="overflow-x-auto rounded-lg">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-secondary text-white">
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      className="w-12 h-12 object-cover rounded-md"
                      src={user.photo}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-sm btn-secondary">Edit</button>
                    <button className="btn btn-sm btn-danger ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
