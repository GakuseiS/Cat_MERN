import { yupResolver } from "@hookform/resolvers/yup";
import { FormValues } from "./form.types";
import { schema } from "./form.schema";
import { useForm } from "react-hook-form";

export const useRequestForm = () => {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return methods;
};
