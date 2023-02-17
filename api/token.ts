export const getToken = () => `Bearer ${localStorage.getItem("wackToken")}`;
export const setToken = (token: string) =>
  localStorage.setItem("wackToken", token);
