import React from "react";
import UserList from "./components/UserList";
import UserCard from "./components/UserCard";

const App = () => {
  return (
    <div className="bg-customBg min-h-screen p-4 sm:p-6 md:p-28">
      <UserList />
    </div>
  );
};

export default App;
