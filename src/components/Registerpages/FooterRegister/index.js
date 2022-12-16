import styles from "./FooterRegister.module.scss";
import classNames from "classnames/bind";

var cx = classNames.bind(styles);

function FooterRegister() {
  return (
    <div className={cx("wrapper")}>
      <img className={cx("responsive")} src="./a.png"></img>

      <div className={cx("footer")}>
        <h2 className={cx("footer-logo")}>Vastum</h2>
        <div className={cx("footer-line")}></div>
        <div className={cx("footer-element")}>
          <p className={cx("footer-element-coppyright")}>
            © 2022 Vastum Technologies, Inc.
          </p>
          <p className={cx("footer-element-privary")}>
            Privacy Policy | Terms of Use
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterRegister;
