import Login from "../components/Login";
import React from "react";
import dynamic from "next/dynamic";
const Layout = dynamic(import("../components/layout"));

const LoginView = () => {
  return (
    <Layout title="Pagas Login" description="Login page">
      <Login />
    </Layout>
  );
};

export default LoginView;
