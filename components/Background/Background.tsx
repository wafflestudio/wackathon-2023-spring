import styles from "./Background.module.scss";
import classNames from "classnames/bind";
import useTheme from "../../store/useTheme";

const cx = classNames.bind(styles);

const Background = () => {
  const { current, transitionTo } = useTheme((state) => state);
  return (
    <div
      className={cx("Background", `${current}Theme`, {
        [transitionTo ? transitionTo + "Transition" : "noTransition"]:
          transitionTo,
      })}
    >
      <div className={cx("backgroundTransition")} />
      <div className={cx("letters")}>
        <div className={cx("shadow", "piece1")} />
        <div className={cx("shadow", "piece2")} />
        <div className={cx("shadow", "piece3")} />
        <div className={cx("shadow", "piece4")} />
        <div className={cx("letter", "piece1")} />
        <div className={cx("letterTransition", "piece1")} />
        <div className={cx("letter", "piece2")} />
        <div className={cx("letterTransition", "piece2")} />
        <div className={cx("letter", "piece3")} />
        <div className={cx("letterTransition", "piece3")} />
        <div className={cx("letter", "piece4")} />
        <div className={cx("letterTransition", "piece4")} />
      </div>
    </div>
  );
};

export default Background;
