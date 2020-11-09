import ErrorCmp from "./ErrorCmp";
import { PropTypes } from "prop-types";
import { useDropzone } from "react-dropzone";
import SvgCmpUpload from "./svgCmp/SvgCmpUpload";
import React, { useState, useCallback, useContext } from "react";
import NotificationContext from "./NotificationContext";

const FileUpload = (props) => {
  const { setAcceptedFiles } = useContext(NotificationContext);

  const { fileMessage, maxSize } = props;
  const [isFileRejected, setIsFileRejected] = useState(false);

  const isValidSizeFile = (files) => {
    const totalFileSize = files
      .map((file) => file.size)
      .reduce((previous, current) => {
        return previous + current;
      });
    // Adding this logic because dropZone maxSize does not have a flag
    // when file exceed
    totalFileSize > maxSize
      ? (setIsFileRejected(true), (files.length = 0))
      : setIsFileRejected(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setAcceptedFiles(acceptedFiles);
    acceptedFiles.length > 0
      ? isValidSizeFile(acceptedFiles)
      : setIsFileRejected(false);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    accept: "image/*,audio/*,video/*",
  });

  // class to set bg green  or red depending if file was accepted and it is about to drop
  const additionalClass =
    isDragAccept && isDragActive ? "accept" : isDragReject ? "reject" : "base";

  const files = acceptedFiles.map((file) => (
    <ul className="pt-2" key={file.path}>
      {file.path}-{file.size} Bytes
    </ul>
  ));

  return (
    <div className="flex flex-col justify-center text-center dropzoneReject">
      <div
        {...getRootProps({
          className: `flex flex-row justify-center items-center cursor-pointer border border-gray-200 focus:outline-none focus:border-green-1000 rounded w-full py-3 px-3 leading-tight focus:outline-none' ${
            additionalClass === "reject" && "bg-red-100 border border-red-400"
          } ${
            additionalClass === "accept" &&
            "bg-green-100 border border-green-400"
          } ${additionalClass === "base" && "bg-light-blue"}`,
          onClick: (event) => event.preventDefault(),
        })}
      >
        <SvgCmpUpload />
        <input name="file" {...getInputProps()} />
        <p className="pl-4 text-xs">{fileMessage}</p>
      </div>

      {isDragReject && (
        <ErrorCmp
          classError="mt-2 text-red-500 text-xs italic"
          errorMessage="File type not accepted. Image, audio and video only"
        />
      )}
      {isFileRejected ? (
        <ErrorCmp
          classError="mt-2 text-red-500 text-xs italic"
          errorMessage={`Max size of file upload is ${maxSize / 1048576} Mb`}
        />
      ) : (
        acceptedFiles.length > 0 && (
          <aside className="pt-2">
            <div className="text-xs flex flex-col">
              <span className="no-underline text-left">{files}</span>
            </div>
          </aside>
        )
      )}
    </div>
  );
};

FileUpload.propTypes = {
  fileMessage: PropTypes.string,
  maxSize: PropTypes.number,
};

FileUpload.defaultProps = {
  fileMessage: "Click or drop files(Img, AV)",
  maxSize: 10,
};

export default FileUpload;
