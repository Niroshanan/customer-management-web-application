import { appToast } from "@/utils/appToast";

export const login = async (username, password) => {
  try {
    const response = await fetch(
      "https://localhost:7113/api/Authentication/Login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw await response.json();
    }
  } catch (error) {
    throw error;
  }
};

export const loadData = async (apiEndpoint) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  try {
    const response = await fetch(`https://localhost:7113/api/Customer/${apiEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    let data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw data;
    }
  } catch (error) {
    throw error;
  }
};

export const logOut = async (url) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  try {
    const response = await fetch("https://localhost:7113/api/Authentication/Logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
