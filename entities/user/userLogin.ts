import { User, UserInfo } from "./user";

export type UserLoginRequest = Pick<User, "username" | "password">;

export type UserLoginResponse = { token: string; user: UserInfo };
