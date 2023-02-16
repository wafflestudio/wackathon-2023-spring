import styles from "./MyTeam.module.scss";
import classNames from "classnames/bind";
import Background from "../../components/Background/Background";
import useTheme from "../../store/useTheme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CreateTeamRequest } from "../../entities/team/createTeam";

const cx = classNames.bind(styles);

const MyTeam = () => {
  const { transitionTo, setCurrent, setTransition } = useTheme(
    (state) => state,
  );
  const router = useRouter();
  const [createTeamValue, setCreateTeamValue] = useState<CreateTeamRequest>({
    name: "",
    resolution: "",
    maxMembers: 4,
  });

  useEffect(() => {
    setCurrent("myteam");
  }, []);

  return (
    <main className={cx("MyTeam", "new", { nowTransition: transitionTo })}>
      <Background />
      <div className={cx("container")}>
        <section className={cx("teamName")}>
          <div className={cx("label")}>팀 명 </div>
          <input
            type="text"
            className={cx("input")}
            value={createTeamValue.name}
            onChange={(e) => {
              setCreateTeamValue({ ...createTeamValue, name: e.target.value });
            }}
          />
        </section>
        <section className={cx("resolution")}>
          <div className={cx("label")}>팀 소개</div>
          <textarea
            className={cx("input")}
            value={createTeamValue.resolution}
            onChange={(e) => {
              setCreateTeamValue({
                ...createTeamValue,
                resolution: e.target.value,
              });
            }}
          />
          <div className={cx("content")}></div>
        </section>
        <section className={cx("amount")}>
          <div className={cx("label")}>최대 팀원</div>
          <input
            type="range"
            className={cx("numberRange")}
            max={4}
            min={1}
            value={createTeamValue.maxMembers}
            onChange={(e) => {
              setCreateTeamValue({
                ...createTeamValue,
                maxMembers: Number(e.target.value),
              });
            }}
          />
          <div className={cx("numberShow")}>{createTeamValue.maxMembers}명</div>
          <div className={cx("content")}> 3 / 4</div>
        </section>
        <button className={cx("createTeam")}>팀 생성</button>
      </div>
      <button
        className={cx("prevButton")}
        onClick={() => {
          setTransition("home");
          setTimeout(() => {
            router.push("/home");
          }, 2000);
        }}
      >
        ← 돌아가기
      </button>
    </main>
  );
};

export default MyTeam;
