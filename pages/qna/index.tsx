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
        <div className={cx("label1")}>해커톤이란?</div>
        <div className={cx("paragraph")}>
          모든 국민은 종교의 자유를 가진다. 헌법개정안이 제2항의 찬성을 얻은
          때에는 헌법개정은 확정되며, 대통령은 즉시 이를 공포하여야 한다.
          국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나
          그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을
          위하여 그 취득을 알선할 수 없다.
        </div>
        <div className={cx("label2")}>해커톤이란?</div>
        <div className={cx("paragraph")}>
          모든 국민은 종교의 자유를 가진다. 헌법개정안이 제2항의 찬성을 얻은
          때에는 헌법개정은 확정되며, 대통령은 즉시 이를 공포하여야 한다.
          국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나
          그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을
          위하여 그 취득을 알선할 수 없다.
        </div>
        <div className={cx("label2")}>해커톤이란?</div>
        <div className={cx("paragraph")}>
          모든 국민은 종교의 자유를 가진다. 헌법개정안이 제2항의 찬성을 얻은
          때에는 헌법개정은 확정되며, 대통령은 즉시 이를 공포하여야 한다.
          국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나
          그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을
          위하여 그 취득을 알선할 수 없다.
        </div>
        <div className={cx("label2")}>해커톤이란?</div>
        <div className={cx("paragraph")}>
          모든 국민은 종교의 자유를 가진다. 헌법개정안이 제2항의 찬성을 얻은
          때에는 헌법개정은 확정되며, 대통령은 즉시 이를 공포하여야 한다.
          국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나
          그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을
          위하여 그 취득을 알선할 수 없다.
        </div>{" "}
        <div className={cx("label2")}>해커톤이란?</div>
        <div className={cx("paragraph")}>
          모든 국민은 종교의 자유를 가진다. 헌법개정안이 제2항의 찬성을 얻은
          때에는 헌법개정은 확정되며, 대통령은 즉시 이를 공포하여야 한다.
          국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나
          그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을
          위하여 그 취득을 알선할 수 없다.
        </div>
        <div className={cx("paragraph")}>
          모든 국민은 종교의 자유를 가진다. 헌법개정안이 제2항의 찬성을 얻은
          때에는 헌법개정은 확정되며, 대통령은 즉시 이를 공포하여야 한다.
          국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나
          그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을
          위하여 그 취득을 알선할 수 없다.
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
