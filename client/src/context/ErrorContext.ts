import React from "react";

function noob(message: string) {}

const ErrorContext = React.createContext({
  error: "",
  errorMessage: noob,
});

export default ErrorContext;
