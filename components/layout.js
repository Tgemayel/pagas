import Nav from "./Nav";
import Head from "next/head";
import Spinner from "./Spinner";
// import { Magic } from "magic-sdk";
import { PropTypes } from "prop-types";
import React, { useContext, useEffect } from "react";
import NotificationContext from "./NotificationContext";

const Layout = (props) => {
  const { title, description, children } = props;
  const { isLoading } = useContext(NotificationContext);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div>
        <Nav />
        {isLoading && <Spinner />}
        <main
          className={`relative items-center mx-auto h-(screen-16) w-full overflow-y-auto bg-main-theme ${
            isLoading ? "z-20" : ""
          }`}
          style={{ filter: isLoading ? "blur(4px)" : "" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Layout.defaultProps = {
  title: "Pagas",
  description: "Payment System",
  children: null,
};

export default Layout;
