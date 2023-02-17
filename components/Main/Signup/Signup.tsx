import styles from "./Signup.module.scss";
import { useState } from "react";
import classNames from "classnames/bind";
import useTheme from "../../../store/useTheme";
import { useRouter } from "next/router";
import { UserSignupRequest } from "../../../entities/user/userSignup";
import { postManually } from "../../../api/manual";

const cx = classNames.bind(styles);

const tags = ["서버", "웹 프론트", "ios", "android", "디자인", "기타"];

const Signup = () => {
  const router = useRouter();
  const setTransition = useTheme((state) => state.setTransition);
  const setCurrent = useTheme((state) => state.setCurrent);
  const [{ username, password, fullname, positions }, setSignupValue] =
    useState<UserSignupRequest>({
      username: "",
      password: "",
      fullname: "",
      positions: [],
    });
  const [fetchStatus, setFetchStatus] = useState<
    "normal" | "fetching" | "success" | "fail"
  >("normal");
  return (
    <form
      className={cx("Signup")}
      onSubmit={(e) => {
        e.preventDefault();
        postManually<UserSignupRequest>("auth/signup", {
          username,
          password,
          fullname,
          positions,
        }).then(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.log(error);
          },
        );
      }}
    >
      <div className={cx("row", "first")}>
        ID:
        <input
          className={cx("input", "id")}
          type="text"
          value={username}
          onChange={(e) => {
            setSignupValue({
              username: e.target.value,
              password,
              fullname,
              positions,
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
              username,
              password: e.target.value,
              fullname,
              positions,
            });
          }}
        />
      </div>
      <div className={cx("row", "second")}>
        이름:
        <input
          className={cx("input", "username")}
          type="text"
          value={fullname}
          onChange={(e) => {
            setSignupValue({
              username,
              password,
              fullname: e.target.value,
              positions,
            });
          }}
        />
        분야:
        {tags.map((tagName) => (
          <div
            key={tagName}
            className={cx("positionTag", {
              selected: positions.includes(tagName),
            })}
            onClick={() => {
              if (positions.includes(tagName)) {
                setSignupValue({
                  username,
                  password,
                  fullname,
                  positions: positions.filter(
                    (positions) => positions !== tagName,
                  ),
                });
              } else {
                setSignupValue({
                  username,
                  password,
                  fullname,
                  positions: [...positions, tagName],
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
