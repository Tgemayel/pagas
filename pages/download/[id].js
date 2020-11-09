import React from "react";
import dynamic from "next/dynamic";
import { PropTypes } from "prop-types";
import ErrorPage from "next/error";
import SvgCmpFile from "../../components/svgCmp/SvgCmpFile";
const Layout = dynamic(import("../../components/layout"));

const Download = (props) => {
  if (props.errorCode) {
    return <ErrorPage statusCode={props.errorCode} />;
  }
  const {
    product: { _id, publicKey, productPrice, productTitle, productUrl },
  } = props;

  return (
    <Layout
      title="Pagas checkout page"
      description="A page to pay for a product"
    >
      <div className="flex flex-col items-center justify-center pt-12">
        <p className="text-6xl font-semibold text-theme-text">Download File</p>
      </div>
      <div className="flex px-8 mb-12 justify-center py-4 sm:mb-0 sm:w-1/2 sm:mt-20 sm:pt-0 sm:max-w-sm sm:mx-auto">
        <div
          className={`bg-white text-center pt-10 pb-4 mb-6 rounded-lg shadow-md shadow-xl w-300 md:w-375 h-cm sm:h-cd`}
        >
          <div className="text-xs text-gray-500 font-lato mt-4">Amount</div>
          <div className="font-lato text-xl pb-12">{productPrice} Lumens</div>
          <hr className="text-gray-100 text-opacity-25"></hr>
          <div className="py-4 flex justify-center items-center h-40 flex-col">
            <div className="mb-4">
              <SvgCmpFile />
            </div>
            <div className="font-lato text-sm pb-4">{productTitle}</div>
          </div>
          <hr className="text-gray-100 text-opacity-25 mb-10"></hr>
          <div className="flex justify-center items-center h-20">
            <a
              className="w-full sm:w-3/4 bg-purple-1000 hover:bg-purple-1000 text-white py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              href={`${process.env.PRODUCT_API_URL}/api/download/${productUrl[0]}`}
              download
            >
              Click to download
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  let product = {};
  let errorCode = "";
  const request = await fetch(
    `${process.env.PRODUCT_API_URL}/api/products/${query.id}`
  );
  if (request.status === 200) {
    product = await request.json();
  } else {
    errorCode = JSON.stringify(request.status);
    product = { data: {} };
  }
  return { props: { errorCode, product: product.data, query } };
}

export default Download;
