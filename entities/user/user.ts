export type User = {
  id: number;
  password: string;
  username: string;
  fullname: string;
  positions: string[];
  team_id: number | null;
};

export type UserInfo = Omit<User, "password">;

export type UserWithComment = UserInfo & { comment: string };
