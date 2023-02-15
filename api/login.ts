import { baseURL } from "./index";
import { UserLoginRequest } from "../entities/user/userLogin";

export const postLogin = async (body: UserLoginRequest) => {
  try {
    const response = await fetch(`${baseURL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
