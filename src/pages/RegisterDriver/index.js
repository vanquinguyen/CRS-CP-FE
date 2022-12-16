import HeaderRegister from "../../components/Registerpages/HeaderRegister";
import FooterRegister from "../../components/Registerpages/FooterRegister";
import BodyRegisterDriver from "../../components/Registerpages/BodyRegisterDriver";
import classNames from "classnames/bind";
import styles from "./RegisterDriver.module.scss";

const cx = classNames.bind(styles);
function RegisterDriver() {
  return (
    <div className={cx("wrapper")}>
      <HeaderRegister />
      <BodyRegisterDriver />
      <FooterRegister />
    </div>
  );
}

export default RegisterDriver;
