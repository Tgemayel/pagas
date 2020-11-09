import axios from "axios";
import { useRouter } from "next/router";
import ErrorCmp from "./ErrorCmp";
import FileUpload from "./Upload";
import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import { FiCreditCard, FiUser } from "react-icons/fi";
import { RiPriceTag3Line } from "react-icons/ri";
import NotificationContext from "./NotificationContext";
import loadErrorsStellarKey from "../scripts/loadErrors";

const Form = (props) => {
  const {
    setShow,
    setMessage,
    setMessageColor,
    setColor,
    isLoading,
    setLoading,
    selectedFiles,
    setAcceptedFiles,
  } = useContext(NotificationContext);
  const { productsUrl } = props;
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();

  const saveProduct = async ({ fileObj, data, e }) => {
    try {
      const productData = { ...data, productUrl: fileObj.locationArray };
      const url = productsUrl;
      const result = await axios.post(url, productData, {});
      if ((await result?.status) === 201) {
        return result?.data?.data._id || "";
      }
    } catch (error) {
      console.error(error.message);
      e.target.reset();
      e.target.value = "";
      setShow(true);
      setMessage(`Failed to create Product. ${error.message}`);
      setColor("text-red-500");
      setMessageColor("bg-red-100 border border-red-400 text-red-700");
      setLoading(false);
      return "";
    }
  };

  const uploadFiles = async (e, selectedFiles) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(selectedFiles[i].name, selectedFiles[i]);
      }
      const response = await axios.post(
        `${process.env.PRODUCT_API_URL}/api/upload`,
        formData
      );
      return await response.data;
    } catch (error) {
      setLoading(false);
      e.target.reset();
      e.target.value = "";
      setShow(true);
      setMessage(`Failed to upload file(s). ${error.message}`);
      setColor("text-red-500");
      setMessageColor("bg-red-100 border border-red-400 text-red-700");
      return await { status: "fail", message: error.message };
    }
  };

  const createProduct = async ({ fileObj, data, e }) => {
    const productId = await saveProduct({ fileObj, data, e });
    if (await productId) {
      e.target.reset();
      e.target.value = "";
      //mSaves data only during current browsing session.
      sessionStorage.setItem("created", "true");
      router.push(`/product/${productId}`, undefined, { shallow: true });
    }
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    const fileObj = await uploadFiles(e, selectedFiles);
    if (fileObj.status === "ok") {
      createProduct({ fileObj, data, e });
    }
  };

  return (
    <div className={`font-lato w-full max-w-sm`}>
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
                name="publicKey"
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
              errors.publicKey?.type,
              errors.publicKey?.message
            )}
          </div>
          <div className="mb-4">
            <label
              className="block font-lato text-gray-500 text-xs"
              htmlFor="productTitle"
            >
              Product Name
            </label>
            <div className="relative">
              <i className="absolute bottom-0 w-6 h-5 mb-2">
                <FiUser className="w-full h-full" color="gray" />
              </i>
              <input
                type="text"
                placeholder="Enter product name"
                className="text-sm font-lato appearance-none border-b border-gray-200 focus:outline-none focus:border-green-1000 w-full pl-8 py-2 leading-tight focus:outline-none"
                name="productTitle"
                ref={register({ required: "Product title is required" })}
              />
            </div>
            {errors.productTitle?.type === "required" && (
              <ErrorCmp
                classError="mt-2 text-red-500 text-xs italic"
                errorMessage={errors.productTitle.message}
              />
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block font-lato text-gray-500 text-xs"
              htmlFor="productPrice"
            >
              Product Price
            </label>
            <div className="relative">
              <i className="absolute bottom-0 w-6 h-5 mb-2">
                <RiPriceTag3Line className="w-full h-full" color="gray" />
              </i>
              <input
                type="text"
                placeholder="Amount tokens in XLM"
                className="text-sm font-lato appearance-none border-b border-gray-200 focus:outline-none focus:border-green-1000 w-full pl-8 py-2 leading-tight focus:outline-none"
                name="productPrice"
                ref={register({
                  pattern: /^\d+(?:[.,]\d+)*$/i,
                  required: "Product price is required",
                })}
              />
            </div>
            {errors.productPrice?.type === "pattern" && (
              <ErrorCmp
                classError="mt-2 text-red-500 text-xs italic"
                errorMessage={"Incorrect price format"}
              />
            )}
            {errors.productPrice?.type === "required" && (
              <ErrorCmp
                classError="mt-2 text-red-500 text-xs italic"
                errorMessage={errors.productPrice.message}
              />
            )}
          </div>
          <div className="mb-2">
            <label
              className="block font-lato text-gray-500 text-xs"
              htmlFor="productDescription"
            >
              Product Description
            </label>
            <textarea
              className="mb-2 appearance-none border border-gray-200 focus:outline-none focus:border-green-1000 rounded w-full py-3 px-3 leading-tight focus:outline-none text-sm"
              type="text"
              id="productDescription"
              name="productDescription"
              rows="3"
              cols="35"
              ref={register}
            ></textarea>
          </div>
          <div className="mb-6">
            <FileUpload
              fileMessage="Click or drop files(IMG, AV)"
              maxSize={2 * 1048576} //Max file size in MB
              setAcceptedFiles={setAcceptedFiles}
            />
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
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  handleError: PropTypes.func,
  filesUrl: PropTypes.string,
};

Form.defaultProps = {
  handleError: () => {
    return;
  },
  filesUrl: "",
};

export default Form;
