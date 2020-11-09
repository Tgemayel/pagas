import Router from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SvgIconArrow from "./svgCmp/SvgIconArrow";
import SvgCmpDoc from "./svgCmp/SvgCmpDoc";
import SvgCmpCamara from "./svgCmp/SvgCmpCamara";
import SvgCmpVideo from "./svgCmp/SvgCmpVideo";

const IndexForm = () => {
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    Router.push("/new-product");
  };
  return (
    <form
      className="w-full max-h-420 max-w-xs min-w-xs sm:max-w-xs shadow-md pt-2 pb-8 shadow-3xl bg-white rounded-lg font-lato"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center form-wrapper py-4 px-6">
        <div className="mb-4 text-light-black">Get started</div>
        <div className="w-full mb-4 flex">
          <button
            className="w-full max-w-sm mx-auto relative text-sm bg-transparent hover:bg-purple-1000 hover:text-white text-light-black border py-3 px-4 rounded 
                      focus:outline-none focus:shadow-outline transition duration-500 ease-in-out transform"
            type="submit"
          >
            <div className="absolute">
              <SvgCmpVideo />
            </div>
            <p>Sell a video</p>
          </button>
        </div>
        <div className="w-full mb-6 flex">
          <button
            className="w-full max-w-sm mx-auto relative text-sm bg-transparent hover:bg-purple-1000 hover:text-white text-light-black border py-3 px-4 rounded 
            focus:outline-none focus:shadow-outline transition duration-500 ease-in-out transform"
            type="submit"
          >
            <div className="absolute top-6">
              <SvgCmpCamara />
            </div>
            <p>Sell your photos</p>
          </button>
        </div>
        <div className="w-full mb-6 flex">
          <button
            className="w-full max-w-sm mx-auto relative text-sm bg-transparent hover:bg-purple-1000 hover:text-white text-light-black border py-3 px-4 rounded
             focus:outline-none focus:shadow-outline transition duration-500 ease-in-out transform"
            type="submit"
          >
            <div className="absolute top-6">
              <SvgCmpDoc />
            </div>
            <p>Sell a document</p>
          </button>
        </div>
        <div className="w-full mb-6 flex">
          <button
            className="w-full max-w-sm mx-auto relative text-sm bg-transparent hover:bg-purple-1000 hover:text-white text-light-black border py-3 px-4 rounded
             focus:outline-none focus:shadow-outline transition duration-500 ease-in-out transform"
            type="submit"
          >
            <div className="absolute top-6">
              <SvgIconArrow />
            </div>
            <p>Sell your code</p>
          </button>
        </div>
      </div>
    </form>
  );
};

IndexForm.propTypes = {};

IndexForm.defaultProps = {};

export default IndexForm;
