import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import NotificationContext from "./NotificationContext";
import Link from "next/link";

const Login = () => {
  const inputRef = React.createRef();

  const router = useRouter();
  const {
    loggedIn,
    setLoggedIn,
    magic,
    email,
    setEmail,
    disableLogin,
    setDisableLogin,
    setMessage,
    message,
  } = useContext(NotificationContext);

  useEffect(() => {
    inputRef?.current?.focus();
  });
  const authenticateWithDb = async (DIDT) => {
    /* Pass the Decentralized ID token in the Authorization header to the database */
    let res = await fetch(`${process.env.PRODUCT_API_URL}/api/user/login`, {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + DIDT,
      }),
    });

    let data = await res.json();

    /* If the user is authorized, return an object containing the user properties (issuer, publicAddress, email) */
    /* Else, the login was not successful and return false */
    return data.authorized ? data.user : false;
  };

  const handleLogin = async () => {
    try {
      /* disable the form login button to prevent users from clicking it multiple times, triggering mutliple emails */
      setDisableLogin(true);

      /* Get DID Token returned from when the email link is clicked */
      const DIDT = await magic.auth.loginWithMagicLink({ email });

      /* `user` will be the user object returned from the db, or `false` if the login failed */
      let user = await authenticateWithDb(DIDT);
      if (user) {
        setLoggedIn(user.email);
        router.push("/dashboard");
      }
    } catch (err) {
      /* If the user clicked "cancel", allow them to click the login again */
      setDisableLogin(false);

      /* Handle error (which can occur if the user clicks `Cancel` on the modal after submitting their email) */
      console.log(`Error logging in with Magic, ${err}`);
    }
  };

  return (
    <>
      {loggedIn ? ( // If the user is logged in, show a link to the home page
        <>
          You're already logged in! Click <Link href="/dashboard">here</Link> to
          view your Dashboard.
        </>
      ) : (
        <div className="login-form">
          <h4 className="login-form-header">Enter Your Email</h4>
          <form>
            <input
              ref={inputRef}
              className="login-form-input"
              type="email"
              value={email}
              onChange={(e) => {
                setMessage(""); // remove error msg
                setEmail(e.target.value);
              }}
            />
            <div className="error-msg">{message}</div>
            <input
              className="login-form-submit-btn"
              type="submit"
              value="Log in"
              disabled={disableLogin}
              onClick={(e) => {
                e.preventDefault();
                if (!email) return setMessage("Email cannot be empty.");
                handleLogin();
              }}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
