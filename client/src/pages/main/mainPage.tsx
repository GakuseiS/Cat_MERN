import React from "react";
import { Appeal, Example, Features, How } from "./components";

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
