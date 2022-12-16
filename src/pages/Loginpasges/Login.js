import HeaderRegister from "../../components/Registerpages/HeaderRegister";
import FooterRegister from "../../components/Registerpages/FooterRegister";
import BodyLogin from "../../components/Loginpages/BodyLogin";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);
function Login() {
  return (
    <div className={cx("wrapper")}>
      <HeaderRegister></HeaderRegister>
      <BodyLogin />
      <FooterRegister />
    </div>
  );
}

export default Login;
