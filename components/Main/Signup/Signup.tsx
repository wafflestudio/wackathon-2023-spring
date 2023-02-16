import styles from "./Signup.module.scss";
import { useState } from "react";
import classNames from "classnames/bind";
import useTheme from "../../../store/useTheme";
import { useRouter } from "next/router";
import { UserSignupRequest } from "../../../entities/user/userSignup";

const cx = classNames.bind(styles);

const tags = ["서버", "웹 프론트", "ios", "android", "디자인", "기타"];

const Signup = () => {
  const router = useRouter();
  const setTransition = useTheme((state) => state.setTransition);
  const setCurrent = useTheme((state) => state.setCurrent);
  const [{ id, password, username, position }, setSignupValue] =
    useState<UserSignupRequest>({
      id: "",
      password: "",
      username: "",
      position: [],
    });
  const [fetchStatus, setFetchStatus] = useState<
    "normal" | "fetching" | "success" | "fail"
  >("normal");

  return (
    <form
      className={cx("Signup")}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className={cx("row", "first")}>
        ID:
        <input
          className={cx("input", "id")}
          type="text"
          value={id}
          onChange={(e) => {
            setSignupValue({
              id: e.target.value,
              password,
              username,
              position,
            });
          }}
        />
        PASSWORD:
        <input
          className={cx("input", "password")}
          type="password"
          value={password}
          onChange={(e) => {
            setSignupValue({
              id,
              password: e.target.value,
              username,
              position,
            });
          }}
        />
      </div>
      <div className={cx("row", "second")}>
        이름:
        <input
          className={cx("input", "username")}
          type="text"
          value={username}
          onChange={(e) => {
            setSignupValue({
              id,
              password,
              username: e.target.value,
              position,
            });
          }}
        />
        분야:
        {tags.map((tagName) => (
          <div
            key={tagName}
            className={cx("positionTag", {
              selected: position.includes(tagName),
            })}
            onClick={() => {
              if (position.includes(tagName)) {
                setSignupValue({
                  id,
                  password,
                  username,
                  position: position.filter((position) => position !== tagName),
                });
              } else {
                setSignupValue({
                  id,
                  password,
                  username,
                  position: [...position, tagName],
                });
              }
            }}
          >
            {tagName}
          </div>
        ))}
        <input
          className={cx("submit", { fetching: fetchStatus === "fetching" })}
          type="submit"
          value={fetchStatus === "fetching" ? "" : "참가하기"}
        />
      </div>
    </form>
  );
};

export default Signup;
