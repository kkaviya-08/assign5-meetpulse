import { useState } from "react";

import { registerUser } from "../services/api";

import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    name: "",
    email: "",
    password: ""

  });

  const [error, setError] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    // CLIENT-SIDE VALIDATION
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {

      await registerUser({
        name,
        email,
        password
      });

      alert("Registration Successful");

      navigate("/login");

    }

    catch (error) {

      const msg =
        error.response?.data?.message
        || "Registration failed. Please try again.";

      setError(msg);

    }

  };


  return (

    <div className="dashboard">

      <div className="container">

        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <h1>Register</h1>

          {error && (
            <p style={{
              color: "#ff6b6b",
              marginBottom: "10px",
              fontSize: "14px"
            }}>
              {error}
            </p>
          )}

          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
          />

          <button type="submit">

            Register

          </button>

        </form>

      </div>

    </div>

  );

};

export default Register;