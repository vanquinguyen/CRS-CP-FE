import classNames from "classnames/bind";
import styles from "./HeaderLogin.module.scss";

const cx = classNames.bind(styles);

function HeaderRegister() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("background")}></div>
      <div className={cx("logo")}>
        <p className={cx("logo-element")}>Vastum</p>
      </div>
    </div>
  );
}

export default HeaderRegister;
