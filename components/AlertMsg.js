import "../public/alerts.css";
import { PropTypes } from "prop-types";
import React, { useEffect } from "react";

const ErrorMessage = (props) => {
  const { message, messageColor, crossColor, messageDuration, setShow } = props;

  useEffect(() => {
    setTimeout(() => setShow(false), messageDuration); //Hide alert message in ms
  });

  const closeWindow = () => {
    setShow(false);
  };

  return (
    <>
      <div
        className={`m-16 z-50 flex items-center justify-between alert-msg fixed right-0 mx-5 mb-5 ${messageColor} px-4 py-3 rounded`}
        role="alert"
      >
        <span className="mr-4">{message}</span>
        <svg
          className={`fill-current h-6 w-6 ${crossColor}`}
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={closeWindow}
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </div>
    </>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  messageDuration: PropTypes.number,
  crossColor: PropTypes.string,
  messageColor: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: "Something went wrong",
  messageDuration: 10000,
  crossColor: "text-red-500",
  messageColor: "bg-red-100 border border-red-400 text-red-700",
};

export default ErrorMessage;
