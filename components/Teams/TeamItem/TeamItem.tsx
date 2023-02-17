import styles from "./TeamItem.module.scss";
import { Team } from "../../../entities/team/team";
import classNames from "classnames/bind";
import { useState } from "react";
import ReactParallaxTilt from "react-parallax-tilt";
import { postApplyTeam } from "../../../api/team";

const cx = classNames.bind(styles);

type Props = { team: Team; isMine: boolean; canApply: boolean };
const TeamItem = ({ team, isMine, canApply }: Props) => {
  const { id, name, maxMembers, resolution, members, applications } = team;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  return (
    <ReactParallaxTilt
      tiltReverse={true}
      perspective={5000}
      tiltMaxAngleX={20}
      tiltMaxAngleY={5}
    >
      <li className={cx("TeamItem", { open: isOpen })}>
        <section
          className={cx("main")}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className={cx("label")}>팀 명</div>
          <div className={cx("teamName")}>{name}</div>
          <div className={cx("amount")}>
            인원: <span className={cx("number")}> {members.length}</span>
            <span className={cx("slash")}>/</span>
            <span className={cx("number")}> {maxMembers}</span>
          </div>
        </section>
        {isOpen && (
          <section className={cx("more")}>
            <div className={cx("label")}>소개</div>
            <div className={cx("resolution")}>{resolution}</div>
            <div className={cx("divider")} />
            <div className={cx("label")}>멤버</div>
            <div className={cx("members")}>
              {members.map(({ username, id: memberId, positions }) => (
                <div key={memberId} className={cx("member")}>
                  <div className={cx("username")}>{username}</div>
                  <div className={cx("id")}>{memberId}</div>
                  <div className={cx("positions")}></div>
                </div>
              ))}
            </div>
            <div className={cx("divider")} />
            <div className={cx("label")}>지원하기</div>
            {isMine && (
              <div className={cx("warning")}>이 팀에 속해있습니다</div>
            )}
            {!isMine && !canApply && (
              <div className={cx("warning")}>
                다른 팀에 속해 있어 지원할 수 없습니다
              </div>
            )}
            {!isMine && canApply && (
              <div className={cx("apply")}>
                <div className={cx("askComment")}>
                  지원하기 전에 자신을 간단하게 소개해주세요!
                </div>
                <form
                  className={"applyForm"}
                  onSubmit={(e) => {
                    e.preventDefault();
                    postApplyTeam(id).then(
                      (res) => {
                        if (res.success) {
                        }
                      },
                      () => {},
                    );
                  }}
                >
                  <input
                    type="text"
                    className={cx("commentInput")}
                    placeholder="한 줄 소개"
                  />

                  <input type="submit" className={cx("commentSubmit")} />
                </form>
              </div>
            )}
            <div className={cx("current")}>
              현재 {applications.length}명이 지원했습니다
            </div>
          </section>
        )}
      </li>
    </ReactParallaxTilt>
  );
};

export default TeamItem;
