import React from "react";
import Header from "../../components/Header";
import FooterRegister from "../../components/Registerpages/FooterRegister";
import HeaderRegister from "../../components/Registerpages/HeaderRegister";
import BodyRegister from "../../components/Registerpages/BodyRegister";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";

const cx = classNames.bind(styles);


const Register = () => {
  return (
    <div className={cx('wrapper')}>
      {/* <Header /> */}
      <HeaderRegister></HeaderRegister>
      <BodyRegister></BodyRegister>
      <FooterRegister ></FooterRegister>
    </div>
  );
};

export default Register;
