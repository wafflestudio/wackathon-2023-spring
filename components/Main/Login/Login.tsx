import styles from "./Login.module.scss";
import { useState } from "react";
import { UserLoginRequest } from "../../../entities/user/userLogin";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { postSignIn } from "../../../api/auth";
import useUser from "../../../store/useUser";
import { setToken } from "../../../api/token";
import { defaultTransition } from "../../transition";
import { sendToast } from "../../../store/useToast";

const cx = classNames.bind(styles);

const Login = () => {
  const router = useRouter();
  const [{ username, password }, setLoginValue] = useState<UserLoginRequest>({
    username: "",
    password: "",
  });
  const [fetchStatus, setFetchStatus] = useState<
    "normal" | "fetching" | "success" | "fail"
  >("normal");
  const setUser = useUser((state) => state.setUser);
  return (
    <form
      className={cx("Login")}
      onSubmit={(e) => {
        e.preventDefault();
        if (username.length < 1 || password.length < 1) {
          sendToast("아이디와 비밀번호를 모두 입력해주세요", "warn");
          return null;
        }
        postSignIn({ username, password }).then(
          (res) => {
            setToken(res.token);
            setUser(res.user);
            defaultTransition(router, "home");
          },
          (error) => {
            sendToast("아이디나 비밀번호를 확인하세요", "warn");
          },
        );
      }}
    >
      ID:
      <input
        className={cx("input", "id")}
        type="text"
        value={username}
        onChange={(e) => {
          setLoginValue({
            username: e.target.value,
            password,
          });
        }}
      />
      PASSWORD:
      <input
        className={cx("input", "password")}
        type="password"
        value={password}
        onChange={(e) => {
          setLoginValue({
            username,
            password: e.target.value,
          });
        }}
      />
      <input
        className={cx("submit", { fetching: fetchStatus === "fetching" })}
        type="submit"
        value={fetchStatus === "fetching" ? "" : "로그인"}
      />
    </form>
  );
};

export default Login;
