import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import NotificationContext from "./NotificationContext";
import React, { createContext, useContext, useEffect } from "react";

function AuthProvider({ children }) {
  const AuthContext = createContext();
  const { pathname, events } = useRouter();
  const {
    loggedIn,
    setLoggedIn,
    magic,
    setLoadingMagic,
    setMagic,
  } = useContext(NotificationContext);

  async function isUserLoggedIn() {
    setLoadingMagic(true);

    /* Magic is initialized in `useEffect` so it has access to the global `window` object inside the browser */
    let m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
    await setMagic(m);

    try {
      /* On page refresh, send a request to /api/user to see if there's a valid user session */
      let res = await fetch(`${process.env.PRODUCT_API_URL}/api/user`);
      let data = await res.json();

      /* If the user has a valid session with our server, it will return {authorized: true, user: user} */
      let loggedIn = data.authorized ? data.user : false;

      /* If db returns {authorized: false}, there is no valid session, so log user out of their session with Magic if it exists */
      !loggedIn && magic && magic.user && magic.user.logout();
      await setLoggedIn(loggedIn.email);
      setLoadingMagic(false);
    } catch (e) {
      console.log(e); //TODO ADD MESSAGE COMP
    }
  }

  // Check if the user is logged in in the DB with every route change:
  useEffect(() => {
    isUserLoggedIn();
  }, [pathname]);

  // Send user back to index page right at the start of the navigation process:
  useEffect(() => {
    // Check a new route is valid
    const handleRouteChange = (url) => {
      if (url !== "/" && !loggedIn) {
        window.location.href = "/";
      }
    };

    // Check that initial route is OK
    if (pathname !== "/" && !loggedIn) {
      window.location.href = "/";
    }

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn }}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider };
