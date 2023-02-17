import { UserInfo } from "./user/user";

export type Application = {
  id: number;
  user: UserInfo;
  team_id: number;
  comment: string;
};
