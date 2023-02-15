import { rest } from "msw";
import { fakeUsers } from "./fakeDatabase";
import { UserLoginRequest } from "../entities/user/userLogin";

export const handlers = [
  rest.post<UserLoginRequest>("/login", (req, res, ctx) => {
    const { password } = req.body;
    if (password === "right") {
      return res(ctx.status(200), ctx.json(fakeUsers[0]));
    } else {
      return res(ctx.status(403));
    }
  }),
];
