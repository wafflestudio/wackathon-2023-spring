import styles from "./TeamItem.module.scss";
import { Team } from "../../../entities/team/team";
import classNames from "classnames/bind";
import { useState } from "react";
import ReactParallaxTilt from "react-parallax-tilt";

const cx = classNames.bind(styles);

type Props = { team: Team };
const TeamItem = ({ team }: Props) => {
  const { id, teamName, maximumNumber, resolution, members, applicants } = team;
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          <div className={cx("teamName")}>{teamName}</div>
          <div className={cx("amount")}>
            인원: <span className={cx("number")}> {members.length}</span>
            <span className={cx("slash")}>/</span>
            <span className={cx("number")}> {maximumNumber}</span>
          </div>
        </section>
        {isOpen && (
          <section className={cx("more")}>
            <div className={cx("label")}>소개</div>
            <div className={cx("resolution")}>{resolution}</div>
            <div className={cx("divider")} />
            <div className={cx("label")}>멤버</div>
            <div className={cx("members")}>
              {members.map(({ username, id: memberId, position }) => (
                <div key={memberId} className={cx("member")}>
                  <div className={cx("username")}>{username}</div>
                  <div className={cx("id")}>{memberId}</div>
                  <div className={cx("positions")}></div>
                </div>
              ))}
            </div>
            <div className={cx("divider")} />
            <div className={cx("label")}>지원하기</div>
            <div className={cx("apply")}></div>
          </section>
        )}
      </li>
    </ReactParallaxTilt>
  );
};

export default TeamItem;
