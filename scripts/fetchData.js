export const postData = async (url = "", data = {}, requestConfig = {}) => {
  const { method, mode, cache, credentials, contentType } = requestConfig;
  const response = await fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode, // no-cors, *cors, same-origin
    cache, // *default, no-cache, reload, force-cache, only-if-cached
    credentials, // include, *same-origin, omit
    headers: {
      "Content-Type": contentType,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: data && JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

export const getData = async (url) => {
  let response = {};
  try {
    response = await fetch(url);
    const statusCode = response.length === 0 ? 400 : 200;
    response.statusCode = statusCode;
    return response.json();
  } catch (e) {
    console.log("ERROR", e);
    return [
      { statusCode: 503, message: "Service Unavailable", reason: e.message },
    ];
  }
};
