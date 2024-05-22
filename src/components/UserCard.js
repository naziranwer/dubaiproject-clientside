import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md flex  transform transition-transform hover:translate-y-2 hover:scale-105 cursor-pointer  hover:border-blue-200 hover:shadow-lg">
      <img
        src={user.image}
        alt={user.name}
        className="w-20 h-20 rounded-full "
      />
      <div className="ml-4">
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.location}</p>
        <div className="mt-3 flex flex-wrap">
          {user.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-white text-customBlue text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-2xl border-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
