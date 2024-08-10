import React, { useState } from "react";
import { createUser } from "../services/userServices";

const SignUpForm = ({ onUserAdded }) => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user).then((response) => {
      onUserAdded(response.data);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
      />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
