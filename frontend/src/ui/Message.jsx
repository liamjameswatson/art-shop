import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  // variant: success, error, warning, info, danger
  return <Alert variant={variant}>{children}</Alert>;
};

// default is info (a light blue
Message.defaultProps = {
  variant: "info",
};

export default Message;
