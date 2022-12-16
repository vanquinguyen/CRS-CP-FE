import FooterCustom from "../FooterCustom";
import Header from "../Header/index";

export function withHeaderHOC(Component) {
  return function HeaderHOC() {
    return (
      <>
        <Header />
        <Component />
        <FooterCustom />
      </>
    );
  };
}
