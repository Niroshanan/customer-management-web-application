import { appToast } from "@/utils/appToast";

export const loadData = async (apiEndpoint) => {
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  try {
    const response = await fetch(apiEndpoint, {
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
