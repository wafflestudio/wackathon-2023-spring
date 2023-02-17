import { baseURL } from "./index";
import { UserLoginRequest } from "../entities/user/userLogin";
import { UserSignupRequest } from "../entities/user/userSignup";

export const postSignIn = async (body: UserLoginRequest) => {
  const formData = new FormData();
  formData.append("username", body.username);
  formData.append("password", body.password);
  try {
    const response = await fetch(`${baseURL}auth/signin`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.token && data.user) {
      return Promise.resolve(data);
    }
    return Promise.reject("로그인 실패!");
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postSignUp = async (body: UserSignupRequest) => {
  try {
    const response = await fetch(`${baseURL}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data.token && data.user) {
      return Promise.resolve(data);
    }
    return Promise.reject("로그인 실패!");
  } catch (e) {
    return Promise.reject(e);
  }
};
