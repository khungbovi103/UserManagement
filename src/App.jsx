import React, { useState } from "react";
import SignUpForm from "./components/signup-form.component";
import UserTable from "./components/list-user.component";

function App() {
  const [users, setUsers] = useState([]);

  const handleUserAdded = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div>
      <h1>User Management</h1>
      <SignUpForm onUserAdded={handleUserAdded} />
      <UserTable users={users} />
    </div>
  );
}

export default App;
