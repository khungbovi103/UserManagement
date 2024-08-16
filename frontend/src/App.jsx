import React, { useState } from "react";
import SignUpForm from "./components/signup-form.component";
import UserTable from "./components/list-user.component";

function App() {
  return (
    <div>
      <h1>User Management</h1>
      <UserTable />
    </div>
  );
}

export default App;
