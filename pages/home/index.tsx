import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import Background from "../../components/Background/Background";
import useTheme from "../../store/useTheme";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useTeams from "../../store/useTeams";
import { getMe } from "../../api/user";
import { authError, unknownError } from "../../api/errorMessages";
import useUser from "../../store/useUser";
import { defaultTransition } from "../../components/transition";

const cx = classNames.bind(styles);

const Home = () => {
  const { transitionTo, setCurrent, setTransition } = useTheme(
    (state) => state,
  );
  const getAllTeamsFromServer = useTeams(
    (state) => state.getAllTeamsFromServer,
  );
  const user = useUser((state) => state);

  const router = useRouter();

  useEffect(() => {
    setCurrent("home");
    getMe().then(
      (res) => {
        user.setUser(res);
      },
      (error) => {
        if (error === authError || error === unknownError) router.push("../");
      },
    );
  }, []);

  return (
    <main className={cx("Home", { nowTransition: transitionTo })}>
      <Background />
      <button
        className={cx("mainButton", "leftTop")}
        onClick={() => {
          setTransition("teams");
          getAllTeamsFromServer();
          defaultTransition(router, "teams");
        }}
      >
        <div className={cx("title")}>팀 찾기</div>
        <div className={cx("content")}>
          미완성 팀을 확인하고 원하는 곳에 신청합니다
        </div>
      </button>
      <button
        className={cx("mainButton", "leftBottom")}
        onClick={() => {
          setTransition("myteam");
          getAllTeamsFromServer();
          setTimeout(() => {
            router.push("/myteam");
          }, 2000);
        }}
      >
        {user.isSignedIn && user.team_id ? (
          <>
            <div className={cx("title")}>팀 관리</div>
            <div className={cx("content")}>속한 팀을 관리합니다</div>
          </>
        ) : (
          <>
            {" "}
            <div className={cx("title")}>팀 생성</div>
            <div className={cx("content")}>
              새로운 팀을 생성하여 해커톤에 참여합니다
            </div>
          </>
        )}
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
