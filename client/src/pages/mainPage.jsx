import React from "react";
import Appeal from "../components/appeal/appeal";
import Example from "../components/example/example.jsx";
import Features from "../components/features/features";
import How from "../components/how/how";

export const MainPage = () => {
  return (
    <div className="mainPage">
      <Appeal />
      <Features />
      <How />
      <Example />
    </div>
  );
};
