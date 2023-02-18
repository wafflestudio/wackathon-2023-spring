import styles from "./Teams.module.scss";
import classNames from "classnames/bind";
import Background from "../../components/Background/Background";
import useTheme from "../../store/useTheme";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useTeams from "../../store/useTeams";
import TeamItem from "../../components/Teams/TeamItem/TeamItem";
import useUser from "../../store/useUser";
import { defaultTransition } from "../../components/transition";

const cx = classNames.bind(styles);

const Teams = () => {
  const { transitionTo, setCurrent, setTransition } = useTheme(
    (state) => state,
  );
  const { teams, getAllTeamsFromServer } = useTeams((state) => state);
  const user = useUser((state) => state);
  const router = useRouter();

  useEffect(() => {
    setCurrent("teams");
    if (!user.isSignedIn) {
      user.getMeFromServer();
    }
    getAllTeamsFromServer();
  }, []);

  return (
    <main className={cx("Home", { nowTransition: transitionTo })}>
      <Background />
      <div className={cx("container")}>
        <div className={cx("heading")}>팀 목록</div>
        <div className={cx("description")}>
          등록된 모든 팀을 확인하고, 자유롭게 지원하세요!
        </div>
        <ul className={cx("teamList")}>
          {/* <button
            className={cx("refresh")}
            onClick={() => {
              getAllTeamsFromServer();
            }}
          >
            새로고침
          </button>
          */}
          {teams
            .filter((team) => team.members.length !== team.maxMembers)
            .map((team) => (
              <TeamItem
                key={team.id}
                team={team}
                isMine={user.isSignedIn && user.team_id === team.id}
                canApply={user.isSignedIn && !user.team_id}
                full={false}
              />
            ))}
          {teams
            .filter((team) => team.members.length === team.maxMembers)
            .map((team) => (
              <TeamItem
                key={team.id}
                team={team}
                isMine={user.isSignedIn && user.team_id === team.id}
                canApply={user.isSignedIn && !user.team_id}
                full={true}
              />
            ))}
        </ul>
        <button
          className={cx("prevButton")}
          onClick={() => {
            setTransition("home");
            getAllTeamsFromServer();
            defaultTransition(router, "home");
          }}
        >
          ← 돌아가기
        </button>
      </div>
    </main>
  );
};

export default Teams;
