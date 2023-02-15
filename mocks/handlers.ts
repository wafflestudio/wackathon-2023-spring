import { rest } from "msw";
import { fakeUsers } from "./fakeDatabase";
import { UserLoginRequest } from "../entities/user/userLogin";

export const handlers = [
  rest.post<UserLoginRequest>("/login", (req, res, ctx) => {
    const { id, password } = req.body;
    if (id === "test" && password === "right") {
      return res(ctx.status(200), ctx.json(fakeUsers[0]));
    } else {
      return res(ctx.status(403));
    }
  }),
];
