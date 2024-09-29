import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../../context/AuthContext";
import { APIContext } from "../../context/api";

const Register = () => {
  const { registerUser } = useContext(APIContext);
  const { setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser(inputValue);
      console.log(data)
      const { success, message } = data;
      console.log(data)
      if (success) {
        localStorage.setItem('token', data.token)
        setUser(data.user);
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
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
      username: "",
    });
  };

  return (
    <div className="w-full h-full flex-box items-center bg-green-100">
      <div className="p-6 bg-gray-200 shadow-md rounded-md w-2/6 h-3/4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Signup Account</h2>
        <form onSubmit={handleSubmit} className="mt-8">
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
            <label htmlFor="username" className="label-class">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
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
          <div className="mt-12">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
            <span className="text-gray-600 ml-5 text-sm">
              Already have an account? <Link to={"/login"} className="text-blue-500">Login</Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;