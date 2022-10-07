import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BaseRoutes } from "./router/index";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<BaseRoutes />);
