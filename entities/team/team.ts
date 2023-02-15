import { UserInfo, UserWithComment } from "../user/user";

export type Team = {
  id: string;
  teamName: string;
  resolution: string;
  maximumNumber: number;
  members: UserInfo[];
  applicants: UserWithComment[];
};
