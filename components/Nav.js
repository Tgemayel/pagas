import Link from "next/link";
import SvgFace from "./svgCmp/SvgFace";
import { useRouter } from "next/router";
import SvgCmpPlus from "./svgCmp/SvgCmpPlus";
import SvgCmpHome from "./svgCmp/SvgCmpHome";
import React, { useContext, useEffect } from "react";
import NotificationContext from "./NotificationContext";

const Navbar = () => {
  const router = useRouter();
  const { loggedIn, setLoggedIn, magic } = useContext(NotificationContext);

  /**
   * Log user out of of the session (clears the `auth` cookie)
   * Log the user out of their session with Magic
   */
  const handleLogout = async () => {
    await fetch(`${process.env.PRODUCT_API_URL}/api/user/logout`);
    setLoggedIn(false);
    const logout = await magic.user.logout();
    if (await logout) {
      router.push("/");
    }
  };

  return (
    <nav className="relative z-10 shadow-custom bg-white flex h-16 justify-around px-10 lg:justify-end">
      <Link href="/">
        <a className="lg:mr-auto">
          <SvgCmpHome />
        </a>
      </Link>
      <Link href="/new-product">
        <a className="py-3">
          <SvgCmpPlus />
        </a>
      </Link>
      <Link href="/">
        <a className="">
          <SvgFace />
        </a>
      </Link>
      {/* If a user is logged in, show our Welcome message and Logout button */}
      {loggedIn && (
        <>
          <div className="nav-user">Welcome, {loggedIn}</div>
          <div className="logout-btn">
            <a
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Logout
            </a>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
