import React, { useEffect } from "react";
import { Alert } from "@src/shared/alert/ui/alert";
import { useAppDispatch, useAppSelector } from "@src/app/store/store.hook";
import { setMessage } from "@src/entities/toast/model/toastSlice";

export const Toast = () => {
  const message = useAppSelector((state) => state.toast.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => dispatch(setMessage("")), 3000);
    }
  }, [message]);

  return <Alert message={message} />;
};
