import { PropTypes } from "prop-types";
import React from "react";

const QrCode = (props) => {
  const { eventPrice, qrCodeBackground, uri } = props;

  return uri ? (
    <div
      className={`${qrCodeBackground} text-center pt-5 pb-4 mb-6 rounded-lg shadow-md shadow-xl w-300 md:w-375 h-cm sm:h-cd`}
    >
      <div className="text-xs text-gray-500 font-lato mt-4">Amount</div>
      <div className="font-lato text-lg pb-6">{eventPrice} Lumens</div>
      <hr className="text-gray-100 text-opacity-25"></hr>
      <div className="py-4">
        <img className="max-w-3/6 mx-auto bg-gray-500" src={uri} alt="qrCode" />
        <div className="font-lato text-gray-500 text-xs pb-4">
          Scan this with your wallet to purchase item
        </div>
      </div>
      <hr className="text-gray-100 text-opacity-25"></hr>
    </div>
  ) : (
    ""
  );
};

QrCode.propTypes = {
  uri: PropTypes.string,
  rdmNbr: PropTypes.string.isRequired,
  paywallHost: PropTypes.string,
  eventPrice: PropTypes.number.isRequired,
  qrCodeBackground: PropTypes.string,
};

QrCode.defaultProps = {
  uri: "",
  rdmNbr: "",
  paywallHost: "",
  eventPrice: "120",
  qrCodeBackground: "bg-white",
};

export default QrCode;
