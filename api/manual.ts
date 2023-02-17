import { baseURL } from "./index";

export const getManually = async (url: string) => {
  try {
    const response = await fetch(`${baseURL}${url}`);
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
};

export const postManually = async <T>(url: string, body: T) => {
  try {
    const response = await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("error");
    throw e;
  }
};
