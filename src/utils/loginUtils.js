import { appToast } from "../utils/appToast";
export const login = async (username, password, router) => {
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
    let data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}`;
      router.push("/customer/dashboard");
      appToast("success", "Login successful");
    } else {
      appToast("error", data.message);
    }
  } catch (error) {
    appToast("error", error.message);
  }
};

export const logout = (router) => {
  
}
