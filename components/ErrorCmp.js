import React from "react";
import { PropTypes } from "prop-types";

const ErrorCmp = (props) => {
  const { classError, errorMessage } = props;
  return <p className={classError}>{errorMessage}</p>;
};

ErrorCmp.propTypes = {
  classError: PropTypes.string,
  errorMessage: PropTypes.string,
};

ErrorCmp.defaultProps = {
  classError: "",
  errorMessage: "",
};

export default ErrorCmp;
