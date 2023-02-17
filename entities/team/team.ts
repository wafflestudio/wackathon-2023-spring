import { UserInfo } from "../user/user";

export type Team = {
  id: number;
  name: string;
  resolution: string;
  maxMembers: number;
  members: UserInfo[];
  applications: {
    id: number;
    team_id: number;
    user_id: number;
    comment: string;
  }[];
};
