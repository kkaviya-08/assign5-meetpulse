import "./App.css";

import {

  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import ProtectedRoute
from "./components/ProtectedRoute";

import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";

import Reports from "./pages/Reports";

import Login from "./pages/Login";

import Register from "./pages/Register";

function App() {

  return (

    <BrowserRouter>

      <div className="app">

        <div className="blur blur1"></div>

        <div className="blur blur2"></div>

        <div className="blur blur3"></div>

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route

            path="/dashboard"

            element={

              <ProtectedRoute>

                <Dashboard />

              </ProtectedRoute>

            }

          />

          <Route

            path="/reports"

            element={

              <ProtectedRoute>

                <Reports />

              </ProtectedRoute>

            }

          />

        </Routes>

        <Footer />

      </div>

    </BrowserRouter>

  );

}

export default App;