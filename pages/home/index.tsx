import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Background from "../../components/Background/Background";
import useTheme from "../../store/useTheme";
import { useRouter } from "next/router";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const Index = () => {
  const { transitionTo, setCurrent, setTransition } = useTheme(
    (state) => state,
  );
  const router = useRouter();

  useEffect(() => {
    setCurrent("home");
  }, []);

  return (
    <main className={cx("Home", { nowTransition: transitionTo })}>
      <Background />
      <section className={cx("introduction")}>
        <div>2023년 2월 23일에서 25일</div>
        <div>와플스튜디오의 해커톤이 돌아오다</div>
      </section>
    </main>
  );
};

export default Index;
