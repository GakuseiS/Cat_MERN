import { yupResolver } from "@hookform/resolvers/yup";
import { usePostLoginMutation, usePostRegisterMutation } from "@src/api/login";
import { useAppDispatch } from "@src/hooks/store.hook";
import { setMessage } from "@src/store/errorSlice";
import { login } from "@src/store/loginSlice";
import { MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FieldsValues, RegisterValues } from "./modal.types";

const schema: yup.SchemaOf<FieldsValues> = yup
  .object({
    name: yup.string().min(3).optional(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export const useModal = ({ onClose }: { onClose: Function }) => {
  const [switcher, setSwitcher] = useState(true);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [postLogin] = usePostLoginMutation();
  const [postRegister] = usePostRegisterMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldsValues>({ mode: "onBlur", resolver: yupResolver(schema) });
  const registerHandler = handleSubmit(async (data) => {
    try {
      const res = await postRegister(data as RegisterValues).unwrap();
      dispatch(setMessage(res.message));
      setSwitcher(true);
      reset();
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error("Ошибка регистрации");
    }
  });

  const loginHandler = handleSubmit(async (data) => {
    try {
      const res = await postLogin(data).unwrap();
      dispatch(login(res));
      onClose(false);
      history("/");
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error("Ошибка авторизации");
    }
  });

  const switchContent: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    setSwitcher((prev) => !prev);
  };
  return {
    loginHandler,
    registerHandler,
    switcher,
    register,
    errors,
    switchContent,
  };
};
