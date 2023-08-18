import React from "react";
// eslint-disable-next-line import/no-absolute-path
import SpinLoader from "/Spin-200px.svg";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <img src={SpinLoader} alt="Loading . . ." />
    </div>
  );
}
