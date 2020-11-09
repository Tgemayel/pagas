import React from "react";
import dynamic from "next/dynamic";
const Layout = dynamic(import("../components/layout"));
const IndexForm = dynamic(import("../components/IndexForm"));

const Dashboard = (props) => {
  return (
    <Layout title="Pagas dashboard" description="Dashboard page">
      <div className="flex flex-col pt-24 sm:pt-32 sm:pb-24 sm:flex-row md:pb-auto text-theme-text">
        <div className="w-full text-left px-8 max-w-sm mx-auto sm:w-1/2 sm:max-w-lg sm:mx-auto md:px-auto md:mr-0">
          <p className="w-full text-7xl leading-none max-w-xl mx-auto">
            Monetize your talents.
          </p>
          <div className="mx-auto max-w-xl">
            <p className="pt-12 pb-4 font-medium">About Pagas</p>
            <p className="text-sm lg:pr-32">
              Pagas mission is to make Stellar more attractive for programmers
              and entreprenuers to build upon it, showing whats possible with
              XLM.
            </p>
          </div>
          <div className="flex mx-auto max-w-xl pt-12 pb-4">
            <p className="font-medium pr-4">Built with Stellar</p>
            <img
              className="w-icon-w h-icon-h pb-1"
              src="../icons/stellar-icon.png"
            />
          </div>
          <p className="text-sm max-w-xl mx-auto lg:pr-32">
            Stellar makes sending money as easy as email. It provides an easy
            way for you to accept payments from all over the world, and withdraw
            into the currency of your choice.
          </p>
        </div>
        <div className="flex px-8 mb-12 justify-center py-16 sm:mb-0 sm:w-1/2 sm:mt-20 sm:pt-0 sm:max-w-sm sm:mx-auto">
          <IndexForm />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
