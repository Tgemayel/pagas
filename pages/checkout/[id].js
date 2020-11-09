import axios from "axios";
import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import NotificationContext from "../../components/NotificationContext";
import loadErrorsStellarKey from "../../scripts/loadErrors";
import { FiCreditCard } from "react-icons/fi";
const Layout = dynamic(import("../../components/layout"));
const QrCode = dynamic(import("../../components/QrCode"));
const Checkout = (props) => {
  const [uri, setUri] = useState("");
  const {
    product: { _id, publicKey, productPrice, productTitle },
  } = props;
  const { isLoading, setLoading, setMessage } = useContext(NotificationContext);
  const { register, handleSubmit, errors } = useForm();
  setLoading(false);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const { productPrice, publicKey } = props.product;

    axios
      .post(`${process.env.PRODUCT_API_URL}/api/callback`, {
        customerPk: data.customerPublicKey,
        productPrice,
        merchantPk: publicKey,
      })
      .then(
        (response) => {
          setUri(response.data?.uri);
          e.target.reset();
          e.target.value = "";
        },
        (error) => {
          setMessage(`Failed to generate QR code. ${error.message}`);
        }
      );
  };
  return (
    <Layout
      title="Pagas checkout page"
      description="A page to pay for a product"
    >
      <div className="flex flex-col items-center justify-center pt-12">
        <p className="text-6xl font-semibold text-color-theme">Checkout</p>
        <p className="text-lg text-color-theme">{productTitle}</p>
      </div>
      <div className="flex flex-col pt-24 sm:pt-32 sm:pb-24 sm:flex-row md:pb-auto text-theme-text">
        <div className="w-full text-left px-8 max-w-sm mx-auto sm:w-1/2 sm:max-w-lg sm:mx-auto md:px-auto md:mr-0">
          <div className={`font-lato w-full max-w-sm mb-8 md:mb-0`}>
            <form
              // autoComplete={'off'} //on off removes the default light blue color on input
              className="shadow-md pt-10 pb-8 shadow-3xl bg-white rounded-lg"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-wrapper py-4 px-8">
                <div className="mb-4">
                  <label
                    className="block font-lato text-gray-500 text-xs"
                    htmlFor="publicKey"
                  >
                    Public Key
                  </label>
                  <div className="relative">
                    <i className="absolute bottom-0 w-6 h-5 mb-2">
                      <FiCreditCard className="w-full h-full" color="gray" />
                    </i>
                    <input
                      type="text"
                      placeholder="Your Stellar Public Key"
                      className="text-sm font-lato appearance-none border-b border-gray-200 focus:outline-none focus:border-green-1000 w-full pl-8 py-2 leading-tight"
                      name="customerPublicKey"
                      id="publicKey"
                      ref={register({
                        required: "Public key is required",
                        maxLength: 56,
                        minLength: 56,
                        pattern: /^GA/i,
                      })}
                    />
                  </div>
                  {loadErrorsStellarKey(
                    errors.customerPublicKey?.type,
                    errors.customerPublicKey?.message
                  )}
                </div>
                <div className="flex items-center">
                  <button
                    className={`w-full bg-purple-1000 ${
                      isLoading ? "opacity-75" : "opacity-100"
                    } 
                        hover:bg-purple-1000 text-white py-3 px-4 rounded focus:outline-none focus:shadow-outline`}
                    type="submit"
                    disabled={isLoading}
                  >
                    Submit Public Key
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex px-8 mb-12 sm:mb-0 sm:w-1/2 sm:pt-0 sm:max-w-sm sm:mx-auto">
          {/* TODO Change true for uri */}
          {uri && (
            <QrCode
              rdmNbr={_id}
              uri={uri}
              paywallHost={publicKey}
              eventPrice={productPrice}
              qrCodeBackground="bg-white"
            />
          )}
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
  return { props: { errorCode, product: product.data, query } };
}

export default Checkout;
