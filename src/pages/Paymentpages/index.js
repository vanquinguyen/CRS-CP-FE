import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
import Paymentpage from "../../components/Paymentpage";

function Paymentpages() {
  return (
    <>
      <Paymentpage />
    </>
  );
}

export default withHeaderHOC(Paymentpages);
