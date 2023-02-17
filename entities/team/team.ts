import { UserInfo } from "../user/user";
import { Application } from "../applications";

export type Team = {
  id: number;
  name: string;
  resolution: string;
  maxMembers: number;
  members: UserInfo[];
  applications: Application[];
};
