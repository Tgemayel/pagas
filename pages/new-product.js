import React, { useState } from "react";
import dynamic from "next/dynamic";
const Layout = dynamic(import("../components/layout"));
const ErrorMessage = dynamic(import("../components/AlertMsg"));
const ProductForm = dynamic(import("../components/ProductForm"));

const Product = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const handleError = (value, message = "") => {
    setErrorMessage(message);
    setShowError(value);
  };

  return (
    <Layout
      title="New Product page"
      description="A form to create a new product"
    >
      {showError && (
        <ErrorMessage
          message={errorMessage}
          handleError={handleError}
          messageColor={`bg-red-100 border border-red-400 text-red-700`}
          crossColor={`text-red-500`}
          messageDuration={5000}
          // messageClass={`bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 shadow-md`}
        />
      )}
      <div className="flex flex-col">
        <div className="w-full text-center flex-col font-medium px-8">
          <p className="text-theme-text text-7xl leading-none pt-16 pb-8">
            Sell your product.
          </p>{" "}
          {/*Use in a future an API or json for all titles */}
          <p className="text-theme-text pt-4 pb-10">How Pagas works</p>{" "}
          {/*Use in a future an API or json for all titles */}
        </div>
        <div className="w-full flex mb-12 justify-center px-8">
          <ProductForm
            handleError={handleError}
            productsUrl={`${process.env.PRODUCT_API_URL}/api/products`}
            filesUrl={`${process.env.PRODUCT_API_URL}/upload`}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Product;
