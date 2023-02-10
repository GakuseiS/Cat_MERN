export type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type FieldsValues = RegisterValues | LoginValues;
