import { baseURL } from "./index";

export const getHealth = async () => {
  try {
    const response = await fetch(`${baseURL}health`);
    console.log(response);
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
};
