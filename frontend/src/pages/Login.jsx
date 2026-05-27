import { useState } from "react";

import { loginUser } from "../services/api";

import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    email: "",
    password: ""

  });

  const [error, setError] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    // CLIENT-SIDE VALIDATION
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {

      const response =
        await loginUser({
          email,
          password
        });


      localStorage.setItem(

        "token",

        response.data.token

      );


      alert("Login Successful");

      navigate("/dashboard");

    }

    catch (error) {

      const msg =
        error.response?.data?.message
        || "Login failed. Please try again.";

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

          <h1>Login</h1>

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

            Login

          </button>

        </form>

      </div>

    </div>

  );

};

export default Login;