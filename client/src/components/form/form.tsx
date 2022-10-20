import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/store.hook";
import { usePostProgrammMutation } from "../../services/programm";
import { setMessage } from "../../store/errorSlice";
import { Button, Input } from "../index";
import { yupResolver } from "@hookform/resolvers/yup";
import "./form.scss";
import { PhoneInput } from "../UI";
import { FormValues } from "./form.types";
import { schema } from "./form.schema";

export const Form = () => {
  const [postProgramm] = usePostProgrammMutation();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
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
    <form className="form" autoComplete="off" onSubmit={submitHandler}>
      <h3 className="form__title">Заполните анкету и мы подберем программу питания для вашего кота</h3>
      <div className="form__wrapper">
        <div className="form__wrapper-name">
          <label className="form__label" htmlFor="name">
            Имя:*
          </label>
          <Input
            id="name"
            className="form__input-text--name"
            type="text"
            placeholder="БАРСИК"
            {...register("name")}
            required
            error={!!errors.name}
          />
          <label className="form__label" htmlFor="weight">
            Вес (кг):*
          </label>
          <Input
            id="weight"
            className="form__input-text--weight"
            type="number"
            placeholder="7"
            {...register("weight")}
            required
            error={!!errors.weight}
          />
          <label className="form__label" htmlFor="age">
            Возраст (лет):
          </label>
          <Input
            id="age"
            className="form__input-text--age"
            type="number"
            placeholder="7"
            {...register("age")}
            required
            error={!!errors.age}
          />
        </div>
        <div className="form__wrapper-type">
          <input
            className="form__input-radio"
            id="slim"
            type="radio"
            value="slim"
            {...register("type")}
            defaultChecked
          />

          <label className="form__label" htmlFor="slim">
            <span className="form__custom-radio"></span> Похудение
          </label>
          <br />
          <input className="form__input-radio" id="gain" type="radio" value="gain" {...register("type")} />
          <label className="form__label" htmlFor="gain">
            <span className="form__custom-radio"></span> Набор массы
          </label>
          <br />
          <input className="form__input-radio" id="advice" type="radio" value="idn" {...register("type")} />
          <label className="form__label" htmlFor="advice">
            <span className="form__custom-radio"></span>Не знаю (нужен ваш совет)
          </label>
        </div>
      </div>
      <div className="form__contacts">
        <h2 className="form__fancy-title">Контактные данные (владельца кота)</h2>
        <div className="form__wrapper-contacts">
          <label className="form__label" htmlFor="email">
            E-mail:*
          </label>
          <Input
            className="form__input-text--mail"
            id="email"
            type="email"
            placeholder="example@mail.ru"
            {...register("email")}
            required
            error={!!errors.email}
          />
          <label className="form__label" htmlFor="tel">
            Телефон:*
          </label>
          <PhoneInput className="form__input-text--tel" id="tel" {...register("tel")} error={!!errors.tel} required />
        </div>
      </div>
      <div className="form__comments">
        <h2 className="form__fancy-title">Комментарий</h2>
        <textarea className="form__textarea" placeholder="РАССКАЖИТЕ ОБО ВСЕХ ПОВАДКАХ КОТА" {...register("comment")} />
      </div>
      <div className="form__sup">
        <h2 className="form__fancy-title">Дополнительно</h2>
        <input className="form__input-check" id="sugar" type="checkbox" {...register("sugar")} defaultChecked />
        <label className="form__label" htmlFor="sugar">
          <span className="form__custom-check"></span>Сахарозаменитель
        </label>
        <input className="form__input-check" id="water" type="checkbox" {...register("water")} />
        <label className="form__label" htmlFor="water">
          <span className="form__custom-check"></span>Питьевая вода
        </label>
        <input className="form__input-check" id="milk" type="checkbox" {...register("milk")} />
        <label className="form__label" htmlFor="milk">
          <span className="form__custom-check"></span>Молоко
        </label>
        <input className="form__input-check" id="vitamin" type="checkbox" {...register("vitamin")} />
        <label className="form__label" htmlFor="vitamin">
          <span className="form__custom-check"></span>Витамины
        </label>
      </div>
      <Button size="large" type="submit" disabled={!isValid}>
        Отправить заявку
      </Button>
      <p className="form__text">* - Обязательные поля</p>
    </form>
  );
};
