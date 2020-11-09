import "../public/styles.css";
import Router from "next/router";
import React, { useState } from "react";
import ErrorMessage from "../components/AlertMsg";
import { AuthProvider } from "../components/AuthProvider";
import NotificationContext from "../components/NotificationContext";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

//Binding events for the bar to load on page transition
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// The Component prop is the active page
// pageProps is an object with the initial props that were preloaded for your page by one of our data fetching methods
function MyApp({ Component, pageProps }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isLoadingMagic, setLoadingMagic] = useState(false);
  const [selectedFiles, setAcceptedFiles] = useState([]);
  const [magic, setMagic] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [disableLogin, setDisableLogin] = useState(false);

  return (
    <NotificationContext.Provider
      value={{
        setShow,
        setMessage,
        message,
        setColor,
        setMessageColor,
        setLoading,
        isLoading,
        isLoadingMagic,
        setLoadingMagic,
        selectedFiles,
        setAcceptedFiles,
        loggedIn,
        setLoggedIn,
        magic,
        setMagic,
        email,
        setEmail,
        disableLogin,
        setDisableLogin,
      }}
    >
      {/* <AuthProvider> */}
      {show && (
        <ErrorMessage
          setShow={setShow}
          message={message}
          crossColor={color}
          messageColor={messageColor}
        />
      )}
      <Component {...pageProps} />
      {/* </AuthProvider> */}
    </NotificationContext.Provider>
  );
}

export default MyApp;
