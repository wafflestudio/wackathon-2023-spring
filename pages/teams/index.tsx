import styles from "./Teams.module.scss";
import classNames from "classnames/bind";
import Background from "../../components/Background/Background";
import useTheme from "../../store/useTheme";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useTeams from "../../store/useTeams";
import TeamItem from "../../components/Teams/TeamItem/TeamItem";

const cx = classNames.bind(styles);

const Teams = () => {
  const { transitionTo, setCurrent, setTransition } = useTheme(
    (state) => state,
  );
  const { teams, getAllTeamsFromServer } = useTeams((state) => state);
  const router = useRouter();

  useEffect(() => {
    setCurrent("teams");
    setTimeout(() => {
      getAllTeamsFromServer();
    }, 2000);
  }, []);

  return (
    <main className={cx("Home", { nowTransition: transitionTo })}>
      <Background />
      <div className={cx("container")}>
        <div className={cx("heading")}>팀 목록</div>
        <ul className={cx("teamList")}>
          <ol className={cx("control")}>control</ol>
          {teams.map((team) => (
            <TeamItem key={team.id} team={team} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Teams;
