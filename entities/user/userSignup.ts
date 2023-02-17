import { User, UserInfo } from "./user";

export type UserSignupRequest = Omit<User, "team_id" | "id">;

export type UserSignupResponse = { token: string } & UserInfo;
