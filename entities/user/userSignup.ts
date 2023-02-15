import { User, UserInfo } from "./user";

export type UserSignupRequest = Omit<User, "isJoined">;

export type UserSignupResponse = { token: string } & UserInfo;
