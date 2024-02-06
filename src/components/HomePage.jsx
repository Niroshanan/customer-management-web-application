import { login } from "@/pages/api/customer";
import { appToast } from "@/utils/appToast";
import { useRouter } from "next/router";
import React, { useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      if (data.token) {
        document.cookie = `token=${data.token}; SameSite=None; Secure`;
        router.push(`/customer/dashboard`);
        appToast("success", data.message);
      }
    } catch (error) {
      appToast("error", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login Page</h1>
        <form onSubmit={handleSubmit} action="./admin/dashboard">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700  "
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 "
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <div className="flex items-center justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              id="loginbtn"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
