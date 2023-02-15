import { User, UserInfo } from "./user";

export type UserLoginRequest = Pick<User, "id" | "password">;

export type UserLoginResponse = { token: string; user: UserInfo };
