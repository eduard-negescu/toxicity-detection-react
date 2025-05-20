import { useState } from "react";
import api from "../api";
import { Card } from "@mui/joy";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      await api.post("/users/register", {
        username,
        password,
      });
      alert("Signup successful!");
    } catch (error) {
      alert("Error signing up. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div>
      <Card onSubmit={handleSignup}>
        <legend>Sign Up</legend>

        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" id="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Card>
    </div>
  );
};

export default SignupPage;
