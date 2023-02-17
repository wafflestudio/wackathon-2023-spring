import { User, UserInfo } from "./user";

export type UserSignupRequest = Omit<User, "isJoined" | "id">;

export type UserSignupResponse = { token: string } & UserInfo;
