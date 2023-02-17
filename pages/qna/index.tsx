import styles from "./QnA.module.scss";
import classNames from "classnames/bind";
import Background from "../../components/Background/Background";
import { useEffect } from "react";
import useTheme from "../../store/useTheme";
import { defaultTransition } from "../../components/transition";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

const QnA = () => {
  const router = useRouter();
  const { transitionTo, setCurrent, setTransition } = useTheme(
    (state) => state,
  );
  useEffect(() => {
    setCurrent("qna");
  }, []);
  return (
    <main className={cx("QnA", { nowTransition: transitionTo })}>
      <Background />
      <div className={cx("container")}>
        <div className={cx("label1")}>Let{`'`}s Wackathon!</div>
        <div className={cx("paragraph")}>
          2023년을 맞아 새롭게 진행되는 와커톤은 와플스튜디오의 회원들만이
          참여할 수 있는 해커톤 행사입니다. 코로나의 말미에서 모든 활동들이
          비대면에서 대면으로 바뀌는 지금, 개발이라는 공동의 관심사를 중심으로
          모인 동아리원들이 1박 2일동안 즐거운 추억과 경험을 쌓았으면 합니다
        </div>
        <div className={cx("label2")}>해커톤이란?</div>
        <div className={cx("paragraph")}>
          해커톤은 해킹(Hacking)과 마라톤(Marathon)의 합성어로, 개발자와
          디자이너, 기획자 등이 제한된 시간 동안 함께 주제에 맞는 서비스를
          만드는 대회입니다. 짧은 시간동안 결과물을 만들어내야하는 만큼
          팀원들간의 협동심과 기발한 아이디어가 요구됩니다.
        </div>
        <div className={cx("label2")}>와커톤 일정</div>
        <div className={cx("paragraph")}>
          팀빌딩 마감: 2023년 2월 23일 (목) 00시
          <br />
          개막: 2023년 2월 23일 (목) 12시 (301동 101호)
          <br /> 팀 별로 자율적으로 개발 진행
          <br /> 마감: 2023년 2월 25일 (토) 16시
          <br /> 폐막 및 시상 : 2023년 2월 25일 (토) 16시 ~ 18시 (301동 101호)
          <br /> 이후 뒤풀이가 예정되어 있습니다!
        </div>
        <div className={cx("label2")}>참여 방법</div>
        <div className={cx("paragraph")}>
          웹사이트에 로그인한 후, 자신의 팀을 만들거나 원하는 팀에 지원하세요!
          팀빌딩은 2월 22일 (수)까지 진행됩니다. 신청을 하였으나 그 때까지 팀을
          구하지 못한 신청자는 개발 분야를 고려하여 운영진이 팀을 배정할
          예정입니다.
        </div>
      </div>
      <button
        className={cx("prevButton")}
        onClick={() => {
          setTransition("home");
          defaultTransition(router, "home");
        }}
      >
        ← 돌아가기
      </button>
    </main>
  );
};

export default QnA;
