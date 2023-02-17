import styles from "./Toast.module.scss";
import classNames from "classnames/bind";
import useToast from "../../store/useToast";
import { useEffect } from "react";

const cx = classNames.bind(styles);

export const ToastWrapper = () => {
  const { isOn, type, content, resetToast } = useToast((state) => state);
  useEffect(() => {
    if (isOn) {
      setTimeout(() => {
        resetToast();
      }, 2500);
    }
  }, [isOn]);
  return (
    <div className={cx("wrapper")}>
      {isOn && <div className={cx("toast", type)}>{content}</div>}
    </div>
  );
};
