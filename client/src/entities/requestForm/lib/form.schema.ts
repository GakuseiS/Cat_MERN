import * as yup from "yup";
import { FormValues } from "./form.types";

export const schema: yup.SchemaOf<FormValues> = yup
  .object({
    name: yup.string().min(3).required(),
    weight: yup.number().min(0).required(),
    age: yup.number().min(0).required(),
    email: yup.string().email().required(),
    tel: yup
      .string()
      .matches(/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/g)
      .required(),
    comment: yup.string(),
    sugar: yup.boolean(),
    water: yup.boolean(),
    milk: yup.boolean(),
    vitamin: yup.boolean(),
    type: yup.string(),
  })
  .required();
