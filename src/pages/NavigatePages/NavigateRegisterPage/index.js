import { withHeaderHOC } from "../../../components/Header/withHeaderHOC";
import NavigateRegister from "../../../components/Navigate/NavigateRegister";

const Register = () => {
  return (
    <div>
      <NavigateRegister />
    </div>
  );
};

export default withHeaderHOC(Register);
