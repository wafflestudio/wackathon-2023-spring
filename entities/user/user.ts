export type User = {
  id: string;
  password: string;
  username: string;
  position: string[];
  isJoined: boolean;
};

export type UserInfo = Omit<User, "password">;

export type UserWithComment = UserInfo & { comment: string };
