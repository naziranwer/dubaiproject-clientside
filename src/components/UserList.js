import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("New users");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://dubaiproject-server.onrender.com/api/employees"
        );
        setUsers(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )) &&
      user.type === filter
  );

  return (
    <div className="container mx-auto p-4 md:p-20 bg-white rounded-lg min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <div className="mb-4 flex flex-col md:flex-row items-center justify-between">
          <div className="relative mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search users"
              className="pl-10 p-2 border rounded w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 flex-wrap justify-center">
            {["Reputation", "New users", "Voters", "Editors", "Moderators"].map(
              (category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg ${
                    filter === category
                      ? "bg-customBlue text-white"
                      : "bg-white text-gray-800"
                  }`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>
      )}
      {!loading && !error && filteredUsers.length === 0 && (
        <p>No users found.</p>
      )}
      {!loading && !error && filteredUsers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
