import React from "react";
import { Button } from "@src/shared";
import { useAppDispatch } from "@src/app/store/store.hook";
import { setMessage } from "@src/entities/toast/model/toastSlice";
import { FormValues } from "@src/entities/requestForm";
import { useFormContext } from "react-hook-form";
import { usePostProgrammMutation } from "@src/api/request/request.queries";

export const SendRequest = () => {
  const [postProgramm] = usePostProgrammMutation();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormContext<FormValues>();

  const submitHandler = handleSubmit(async (data) => {
    try {
      const { age, weight, sugar, water, milk, vitamin, ...rest } = data;
      const res = await postProgramm({
        ...rest,
        age: +age,
        weight: +weight,
        sugar: String(sugar),
        water: String(water),
        milk: String(milk),
        vitamin: String(vitamin),
      }).unwrap();
      window.scrollTo(0, 0);
      dispatch(setMessage(res.message));
      reset();
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error(err);
    }
  });

  return (
    <Button size="large" type="submit" disabled={!isValid} onClick={submitHandler}>
      Отправить заявку
    </Button>
  );
};
