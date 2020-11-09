// Generatea a URI pre-populated with recipient address
// and requested amount; facilitating easy payment with a users' preferred wallet.

/*eslint no-undef: "error"*/
/*eslint-env node*/
const QRCode = require("qrcode");
// Get Paywall Host's event information from form:
// Hosts's Wallet Public Key (to recieve funds).
// XLM price for Host's event

// -----------Building Below--------------------

const buildRequest = ({ paywallHost, eventPrice }) => {
  let memoId;
  var pubMemo = 0;
  const makeRand = () => {
    return Math.floor(Math.random() * Math.pow(2, 63) + 1);
  };
  memoId = makeRand();
  console.log(memoId);
  if (memoId == "DATABASE CHECK INPUT") {
    memoId = makeRand();
    pubMemo = `&memo_id=${memoId}`;
  } else {
    pubMemo = `&memo_id=${memoId}`;
  }
  return `web+stellar:pay?destination=${paywallHost}&amount=${eventPrice}${pubMemo}`;
};

const generateQR = async (requestConfig) => {
  // Make QRCode image from URI:
  let url = "";
  const uriQRCode = buildRequest(requestConfig);
  try {
    url = await QRCode.toDataURL(uriQRCode);
  } catch (err) {
    console.error(err);
  }
  return url;
};

export default generateQR;
