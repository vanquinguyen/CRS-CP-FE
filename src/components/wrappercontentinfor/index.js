function Wrappercontentinfor({ children }) {
  return <div style={styles}>{children}</div>;
}

const styles = {
  backgroundColor: "white",
  borderRadius: "5px",
  minHeight: "380px",
  marginBottom: "70px",
  marginTop: "20px",
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
};

export default Wrappercontentinfor;
