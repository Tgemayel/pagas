import React, { useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
const Layout = dynamic(import("../../components/layout"));
import SvgCmpCurrency from "../../components/svgCmp/SvgCmpCurrency";
import SvgCmpFileType from "../../components/svgCmp/SvgCmpFileType";
import NotificationContext from "../../components/NotificationContext";

const ProductDetails = ({ errorCode, product }) => {
  if (errorCode) {
    return <ErrorPage statusCode={errorCode} />;
  }
  const router = useRouter();
  const {
    setShow,
    setMessage,
    setMessageColor,
    setColor,
    loading,
    setLoading,
  } = useContext(NotificationContext);
  const { productTitle, productDescription, productPrice, _id } = product;

  useEffect(() => {
    setLoading(false);
    const created = sessionStorage.getItem("created");
    if (created && created === "true") {
      setShow(true);
      setColor("text-teal-500");
      setMessage("Product was sucessfully created");
      setMessageColor(
        "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
      );
      sessionStorage.removeItem("created");
    }
  }, []);

  const goToCheckout = (e) => {
    e.preventDefault();
    // setLoading(true);
    router.push(`/checkout/${_id}`, undefined, { shallow: true }); // Change the URL without running data fetching methods again
  };

  return (
    <Layout
      title="Pagas product purchase"
      description="Product details to purchase"
    >
      <div className="flex justify-center mt-20 px-4">
        <div className="w-full bg-white rounded-sm min-w-320 sm:w-550 max-h-670">
          <img
            className="w-full h-auto md:h-308"
            src="../../img/product-default-img.jpg"
          />
          <div className="flex flex-col sm:flex-row w-full px-8 py-8">
            <div className="w-full flex-col mb-10 sm:flex-row md:w-2/3 px-4">
              <div className="text-xl">{productTitle}</div>
              <div className="text-sm text-light-gray-custom pt-2 flex justify-left">
                {productDescription || "No description provided"}
              </div>
            </div>
            <div className="flex-col w-full md:w-1/3">
              <div className="px-16 sm:px-3 py-5 w-full border border-light-gray-grade-2 rounded-md flex items-left justify-center">
                <div className="w-1/3">
                  <SvgCmpCurrency />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="text-light-gray-custom text-xs">
                    Item Cost
                  </div>
                  <div className="text-lg">{productPrice} XLM</div>
                </div>
              </div>
              <div className="px-10 sm:px-5 py-5 mt-6 w-full border border-light-gray-grade-2 rounded-md flex items-left justify-center">
                <div className="w-1/3">
                  <SvgCmpFileType />
                </div>
                <div className="w-2/3">
                  <div className="text-light-gray-custom text-xs">
                    Content Type
                  </div>
                  <div className="text-lg">None</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center pb-10 px-8 sm:px-16">
            <button
              onClick={goToCheckout}
              className="w-full sm:w-3/4 bg-purple-1000 hover:bg-purple-1000 text-white py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={""}
            >
              Purchase this item
            </button>
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
  }
  return { props: { errorCode, product: product.data, query } }; // will be passed to the page component as props
}

ProductDetails.propTypes = {};

ProductDetails.defaultProps = {
  product: {},
};

export default ProductDetails;
