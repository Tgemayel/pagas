// It takes the percentage to display in a range between 0 and 100.
import React from "react";
import { PropTypes } from "prop-types";

const ProgressBar = (props) => {
  const { progress } = props;
  return (
    <div className="w-full h-2 bg-progress-bar rounded-md">
      <div
        className="bg-progress-bar-2 h-full m-0 rounded-md"
        style={{ width: `${progress} %` }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
};

ProgressBar.defaultProps = {
  progress: 0,
};

export default ProgressBar;
