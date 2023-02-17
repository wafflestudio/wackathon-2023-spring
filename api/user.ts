import { baseURL } from "./index";
import { getToken } from "./token";
import { authError, unknownError } from "./errorMessages";

export const getMe = async () => {
  try {
    const response = await fetch(`${baseURL}users/me`, {
      method: "GET",
      headers: {
        Authorization: getToken(),
      },
    });
    const data = await response.json();
    if (data.detail === "Not authenticated") {
      return Promise.reject(authError);
    }
    if (data.id) {
      return Promise.resolve(data);
    }
    return Promise.reject(unknownError);
  } catch (e) {
    return Promise.reject(e);
  }
};
