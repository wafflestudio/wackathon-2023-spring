import styles from "./Signup.module.scss";
import { useState } from "react";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { UserSignupRequest } from "../../../entities/user/userSignup";
import { sendToast } from "../../../store/useToast";
import { postSignUp } from "../../../api/auth";
import { setToken } from "../../../api/token";
import useUser from "../../../store/useUser";
import { defaultTransition } from "../../transition";

const cx = classNames.bind(styles);

const tags = ["서버", "웹 프론트", "ios", "android", "디자인", "기타"];

const Signup = () => {
  const router = useRouter();
  const setUser = useUser((state) => state.setUser);
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
        if (username.length > 20) {
          sendToast("ID는 20자까지 가능합니다", "warn");
          return null;
        }
        if (fullname.length > 20) {
          sendToast("이름은 20자까지 가능합니다", "warn");
          return null;
        }
        if (username.length < 1 || password.length < 1 || fullname.length < 1) {
          sendToast("모든 정보를 입력해주세요", "warn");
          return null;
        }

        if (positions.length < 1) {
          sendToast("한 개 이상의 분야를 선택하세요", "warn");
          return null;
        }
        postSignUp({
          username,
          password,
          fullname,
          positions,
        }).then(
          (res) => {
            setToken(res.token);
            setUser(res.user);
            defaultTransition(router, "home");
          },
          () => {
            sendToast("회원가입에 실패했습니다", "warn");
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
