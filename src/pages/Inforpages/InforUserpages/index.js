import InforWithNavbar from "../InforWithNavbar.js";
import ContentInforUserPages from "../../../components/InforPages/ContentInforUserPages/index.js";
import { withHeaderHOC } from "../../../components/Header/withHeaderHOC.jsx";

function InforUserPage() {
  return (
    <>
      {/* <div>dnmc</div> */}
      <InforWithNavbar component={ContentInforUserPages}></InforWithNavbar>
    </>
  );
}

export default withHeaderHOC(InforUserPage);
