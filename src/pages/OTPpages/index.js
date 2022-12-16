import OTPpage from "../../components/OTPpage";
import classNames from "classnames/bind";
import styles from "./OTPpages.module.scss";

const cx = classNames.bind(styles);
function OTPpages() {
  return (
    <div className={cx("wrapper")}>
      <OTPpage />
    </div>
  );
}

export default OTPpages;
