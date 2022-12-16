import BookingHistory from "../../components/Historypages/BookingHistory";
import TripHistory from "../../components/Historypages/TripHistory";
import { useSelector } from "react-redux/es/exports";
import { withHeaderHOC } from "../../components/Header/withHeaderHOC";
import className from "classnames/bind";
import styles from "./Historypages.module.scss";

const cx = className.bind(styles);
function Historypages() {
  const auth = useSelector((state) => state.auth);

  if (auth.role === "driver") {
    return (
      <div className={cx("wrapper")}>
        <TripHistory />
      </div>
    );
  }
  if (auth.role === "user") {
    return (
      <div className={cx("wrapper")}>
        <BookingHistory />
      </div>
    );
  }
}

export default withHeaderHOC(Historypages);
