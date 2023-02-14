import styles from "./Main.module.scss";
import classNames from "classnames/bind";
import Background from "../components/Background/Background";
import ReactParallaxTilt from "react-parallax-tilt";
import useTheme from "../store/useTheme";
import { useRouter } from "next/router";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const Main = () => {
  const { transitionTo, setCurrent, setTransition } = useTheme(
    (state) => state,
  );
  const router = useRouter();
  useEffect(() => {
    setCurrent("login");
  }, []);

  return (
    <main className={cx("Main", { nowTransition: transitionTo })}>
      <Background />
      {/*      <section className={cx("timer")}>와카톤 시작까지 124 : 57 : 35</section>*/}
      <section className={cx("introduction")}>
        <div>2023년 2월 23일에서 25일</div>
        <div>와플스튜디오의 해커톤이 돌아오다</div>
      </section>
      <section className={cx("buttons")}>
        <ReactParallaxTilt>
          <button
            className={cx("login")}
            onClick={() => {
              setTransition("home");
              setTimeout(() => {
                setCurrent("home");
                router.push("/home");
              }, 2000);
            }}
          >
            로그인
          </button>
        </ReactParallaxTilt>
        <ReactParallaxTilt>
          <button className={cx("signin")}>등록하기</button>
        </ReactParallaxTilt>
      </section>
    </main>
  );
};

export default Main;
