import { Spinner as ReactSpinner } from "react-bootstrap";

const Spinner = () => {
  return (
    <ReactSpinner
      animation="border"
      role="status"
      style={{
        width: "3rem",
        height: "3rem",
        margin: "auto",
        display: "block",
        marginBottom: "80vh", // temporary fix for spinner to push footer to bottom
      }}
    />
  );
};

export default Spinner;
