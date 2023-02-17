import styles from "./MyTeam.module.scss";
import classNames from "classnames/bind";
import Background from "../../components/Background/Background";
import useTheme from "../../store/useTheme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CreateTeamRequest } from "../../entities/team/createTeam";
import { defaultTransition } from "../../components/transition";
import { getTeam, postAcceptApplication, postCreateTeam } from "../../api/team";
import useUser from "../../store/useUser";
import { Team } from "../../entities/team/team";

const cx = classNames.bind(styles);

const MyTeam = () => {
  const { transitionTo, setCurrent, setTransition } = useTheme(
    (state) => state,
  );
  const router = useRouter();
  const user = useUser((state) => state);
  const [createTeamValue, setCreateTeamValue] = useState<CreateTeamRequest>({
    name: "",
    resolution: "",
    maxMembers: 2,
  });
  const [myTeam, setMyTeam] = useState<Team | null>(null);

  useEffect(() => {
    setCurrent("myteam");
    if (!user.isSignedIn) {
      user.getMeFromServer();
    }
  }, []);

  useEffect(() => {
    if (user.isSignedIn && user.team_id) {
      getTeam(user.team_id).then(
        (res: Awaited<Team>) => {
          setMyTeam(res);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }, [user.isSignedIn]);

  return (
    <main
      className={cx("MyTeam", {
        nowTransition: transitionTo,
        new: !myTeam,
        manage: myTeam,
      })}
    >
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
          <div className={cx("content")}>{myTeam && myTeam.name}가나</div>
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
          <div className={cx("content")}>{myTeam && myTeam.resolution}팀명</div>
        </section>
        <section className={cx("amount")}>
          <div className={cx("label")}>최대 팀원</div>
          <input
            type="range"
            className={cx("numberRange")}
            max={4}
            min={2}
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
        <button
          className={cx("createTeam")}
          onClick={() => {
            postCreateTeam(createTeamValue).then(
              () => {},
              (error) => {
                console.log(error);
              },
            );
          }}
        >
          팀 생성
        </button>
        <section className={cx("manageApplication")}>
          <div className={cx("label")}>지원자</div>
          <div className={cx("content")}>
            {myTeam &&
              myTeam.applications.map((application, index) => (
                <div key={application.id}>
                  <div className={cx("applicant")}>
                    {application.user_id}번 지원자
                    <button
                      className={cx("approve")}
                      onClick={() => {
                        postAcceptApplication(
                          application.team_id,
                          application.user_id,
                        );
                      }}
                    >
                      승인
                    </button>
                    <button className={cx("dismiss")}>거절</button>
                  </div>
                  <div className={cx("comment")}>
                    소감소감소감소감소감소감소감소감소감소감소감소감소감소감소감소감소감소감소감소감소감소감
                    소감소감소감소감소감소감소감소감소감소감
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
      <button
        className={cx("prevButton")}
        onClick={() => {
          defaultTransition(router, "home");
        }}
      >
        ← 돌아가기
      </button>
    </main>
  );
};

export default MyTeam;
