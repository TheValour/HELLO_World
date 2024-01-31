import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
    const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post( "http://localhost:3000/login", {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      console.log(data);
      if (success) {
        localStorage.setItem('token', data.token)
        setUser(data.user);

        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md w-3/4 h-4/5">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="email" className="label-class">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            className="input-class"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="label-class">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            className="input-class"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Submit
        </button>
        <span className="text-gray-600 ml-5">
          Don't have an account? <Link to={"/signup"} className="text-blue-500">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;