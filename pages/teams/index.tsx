import styles from "./Teams.module.scss";
import classNames from "classnames/bind";
import Background from "../../components/Background/Background";
import useTheme from "../../store/useTheme";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useTeams from "../../store/useTeams";
import useUsers from "../../store/useUsers";
import TeamItem from "../../components/Teams/TeamItem/TeamItem";
import useUser from "../../store/useUser";
import { defaultTransition } from "../../components/transition";

const cx = classNames.bind(styles);

const Teams = () => {
  const { transitionTo, setCurrent, setTransition } = useTheme(
    (state) => state,
  );
  const { teams, getAllTeamsFromServer } = useTeams((state) => state);
  const { users, getAllUsersFromServer } = useUsers((state) => state);
  const user = useUser((state) => state);
  const router = useRouter();

  useEffect(() => {
    setCurrent("teams");
    if (!user.isSignedIn) {
      user.getMeFromServer();
    }
    getAllTeamsFromServer();
    getAllUsersFromServer();
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
          <TeamItem
              key={0}
              team={{
                id: 0,
                name: "자유 참가",
                maxMembers: 99,
                resolution: "이 팀은 어떤 팀에도 속하지 않은 분들로 이루어져 있습니다. 와커톤 참가 신청이 끝날 때까지 무소속인 분들은 자동으로 배정될 예정입니다.",
                members: [],
                applications: []
              }}
              isMine={false}
              canApply={false}
              full={false}
          />
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
            getAllUsersFromServer();
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
