import styles from "./MyTeam.module.scss";
import classNames from "classnames/bind";
import Background from "../../components/Background/Background";
import useTheme from "../../store/useTheme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CreateTeamRequest } from "../../entities/team/createTeam";
import { defaultTransition } from "../../components/transition";
import {
  getTeam,
  postAcceptApplication,
  postCreateTeam,
  postLeaveTeam,
} from "../../api/team";
import useUser from "../../store/useUser";
import { Team } from "../../entities/team/team";
import { sendToast } from "../../store/useToast";

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
    maxMembers: 4,
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
            placeholder="최대 10자"
          />
          <div className={cx("content")}>{myTeam && myTeam.name}</div>
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
          <div className={cx("content")}>{myTeam && myTeam.resolution}</div>
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
          <div className={cx("content")}>
            {myTeam ? myTeam.members.length + " / " + myTeam.maxMembers : ""}
          </div>
        </section>
        <button
          className={cx("createTeam")}
          onClick={() => {
            if (createTeamValue.name.length > 10) {
              sendToast("팀 명은 최대 10자입니다", "warn");
              return null;
            }
            if (
              createTeamValue.name.length < 1 ||
              createTeamValue.resolution.length < 1
            ) {
              sendToast("모든 정보를 입력해주세요", "warn");
              return null;
            }
            postCreateTeam(createTeamValue).then(
              () => {
                location.reload();
              },
              (error) => {
                console.log(error);
              },
            );
          }}
        >
          팀 생성
        </button>
        <section className={cx("manageMember")}>
          <div className={cx("label")}>멤버</div>
          <div className={cx("content")}>
            {myTeam &&
              myTeam.members.map((member, index) => (
                <div key={member.id}>
                  <div className={cx("member")}>
                    <span className={cx("fullname")}>{member.fullname}</span>
                    <span className={cx("username")}>{member.username}</span>
                    <div className={cx("positions")}>
                      {member.positions.map((position) => (
                        <div key={position} className={cx("position")}>
                          {position}
                        </div>
                      ))}
                    </div>
                    {user.isSignedIn && member.id === user.id && (
                      <button
                        className={cx("dismiss")}
                        onClick={() => {
                          postLeaveTeam(myTeam.id).then(
                            () => {
                              location.reload();
                            },
                            () => {},
                          );
                        }}
                      >
                        탈퇴
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </section>
        <section className={cx("manageApplication")}>
          <div className={cx("label")}>지원자</div>
          <div className={cx("content")}>
            {myTeam &&
              myTeam.applications.map((application, index) => (
                <div key={application.id}>
                  <div className={cx("application")}>
                    <div>
                      <span className={cx("fullname")}>
                        {application.user.fullname}
                      </span>
                      <span className={cx("username")}>
                        {application.user.username}
                      </span>
                      <div className={cx("positions")}>
                        {application.user.positions.map((position) => (
                          <div key={position} className={cx("position")}>
                            {position}
                          </div>
                        ))}
                      </div>
                      <div className={cx("comment")}>{application.comment}</div>
                    </div>
                    <button
                      className={cx("approve")}
                      onClick={() => {
                        postAcceptApplication(
                          application.team_id,
                          application.user.id,
                        ).then(() => {
                          location.reload();
                        });
                      }}
                    >
                      승인
                    </button>
                    {/*
                    <button className={cx("dismiss")}>거절</button>
                    */}
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
