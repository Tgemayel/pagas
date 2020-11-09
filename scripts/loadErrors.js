import React from "react";
import ErrorCmp from "../components/ErrorCmp";

const loadErrorsStellarKey = (publicKeyType, errorMessage) => {
  switch (publicKeyType) {
    case "required":
      return (
        <ErrorCmp
          classError="mt-2 text-red-500 text-xs italic"
          errorMessage={errorMessage}
        />
      );
    case "pattern":
      return (
        <ErrorCmp
          classError="mt-2 text-red-500 text-xs italic"
          errorMessage={"Public key must start with characters GA"}
        />
      );
    case "maxLength":
      return (
        <ErrorCmp
          classError="mt-2 text-red-500 text-xs italic"
          errorMessage="Your input exceed 56 characters"
        />
      );
    case "minLength":
      return (
        <ErrorCmp
          classError="mt-2 text-red-500 text-xs italic"
          errorMessage="Your input requires to have 56 characters"
        />
      );
    default:
      return;
  }
};

export default loadErrorsStellarKey;
