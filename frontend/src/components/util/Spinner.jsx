import React from "react";
import {ThreeDots } from "react-loader-spinner";

export default function Spinner({ message, height, width, color, messageColor }) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <ThreeDots color="#04bd7d" height={height} width={width} className="m-5" />
      <p style={{ color: messageColor }} className="text-lg text-center px-2">
        {message}
      </p>
    </div>
  );
}
