import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Background from "../../components/Background/Background";
import useTheme from "../../store/useTheme";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useTeams from "../../store/useTeams";

const cx = classNames.bind(styles);

const Home = () => {
  const { transitionTo, setCurrent, setTransition } = useTheme(
    (state) => state,
  );
  const getAllTeamsFromServer = useTeams(
    (state) => state.getAllTeamsFromServer,
  );
  const router = useRouter();

  useEffect(() => {
    setCurrent("home");
  }, []);

  return (
    <main className={cx("Home", { nowTransition: transitionTo })}>
      <Background />
      <button
        className={cx("mainButton", "leftTop")}
        onClick={() => {
          setTransition("teams");
          getAllTeamsFromServer();
          setTimeout(() => {
            router.push("/teams");
          }, 2000);
        }}
      >
        <div className={cx("title")}>팀 찾기</div>
        <div className={cx("content")}>
          미완성 팀을 확인하고 원하는 곳에 신청합니다
        </div>
      </button>
      <button className={cx("mainButton", "leftBottom")}>
        <div className={cx("title")}>팀 생성</div>
        <div className={cx("content")}>
          새로운 팀을 생성하여 해커톤에 참여합니다
        </div>
      </button>
      <button className={cx("mainButton", "rightTop")}>
        <div className={cx("title")}>와커톤 설명</div>
        <div className={cx("content")}>
          와커톤은 무엇이고, 어떻게 진행될까요?
        </div>
      </button>
      <button className={cx("mainButton", "rightBottom")}>
        <div className={cx("title")}>참여자 목록</div>
        <div className={cx("content")}>
          모든 참여자를 확인하고 내 정보를 수정합니다
        </div>
      </button>

      <section className={cx("introduction")}>
        {/*  <div>2023년 2월 23일에서 25일</div>
        <div>와플스튜디오의 해커톤이 돌아오다</div>
        */}
      </section>
    </main>
  );
};

export default Home;
