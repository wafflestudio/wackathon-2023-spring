import styles from "./Login.module.scss";
import { useState } from "react";
import { UserLoginRequest } from "../../../entities/user/userLogin";
import classNames from "classnames/bind";
import { postLogin } from "../../../api/login";
import useTheme from "../../../store/useTheme";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const Login = () => {
  const router = useRouter();
  const setTransition = useTheme((state) => state.setTransition);
  const setCurrent = useTheme((state) => state.setCurrent);
  const [{ id, password }, setLoginValue] = useState<UserLoginRequest>({
    id: "",
    password: "",
  });

  return (
    <form
      className={cx("Login")}
      onSubmit={(e) => {
        e.preventDefault();
        postLogin({ id, password }).then(
          (res) => {
            setTransition("home");
            setTimeout(() => {
              setCurrent("home");
              router.push("/home");
            }, 2000);
          },
          (err) => console.log(err),
        );
      }}
    >
      ID:
      <input
        className={cx("input", "id")}
        type="text"
        value={id}
        onChange={(e) => {
          setLoginValue({
            id: e.target.value,
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
            id,
            password: e.target.value,
          });
        }}
      />
      <input className={cx("submit")} type="submit" value={"로그인"} />
    </form>
  );
};

export default Login;
