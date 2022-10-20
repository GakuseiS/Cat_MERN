import React, { FormEventHandler } from "react";
import InputMask from "react-input-mask";
import { useAppDispatch } from "../../hooks/store.hook";
import { usePostProgrammMutation } from "../../services/programm";
import { setMessage } from "../../store/errorSlice";
import { Button, Input } from "../index";
import "./form.scss";

type FormFields = {
  name: HTMLInputElement;
  weight: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  tel: HTMLInputElement;
  comment: HTMLTextAreaElement;
  sugar: HTMLInputElement;
  water: HTMLInputElement;
  milk: HTMLInputElement;
  vitamin: HTMLInputElement;
  type: HTMLInputElement;
};

export const Form = () => {
  const [postProgramm] = usePostProgrammMutation();
  const dispatch = useAppDispatch();

  const submitHandler: FormEventHandler<HTMLFormElement & FormFields> = async (event) => {
    event.preventDefault();
    const { name, weight, age, email, tel, comment, sugar, water, milk, vitamin, type } = event.currentTarget;
    try {
      const data = await postProgramm({
        name: name.value,
        weight: +weight.value,
        age: +age.value,
        email: email.value,
        tel: tel.value,
        comment: comment.value,
        milk: milk.value,
        sugar: sugar.value,
        water: water.value,
        vitamin: vitamin.value,
        type: type.value,
      }).unwrap();
      window.scrollTo(0, 0);
      dispatch(setMessage(data.message));
    } catch (err: any) {
      dispatch(setMessage(err.data?.message));
      console.error(err);
    }
  };

  return (
    <form className="form" autoComplete="off" onSubmit={submitHandler}>
      <h3 className="form__title">Заполните анкету и мы подберем программу питания для вашего кота</h3>
      <div className="form__wrapper">
        <div className="form__wrapper-name">
          <label className="form__label" htmlFor="name">
            Имя:*
          </label>
          <Input id="name" className="form__input-text--name" type="text" placeholder="БАРСИК" name="name" required />
          <label className="form__label" htmlFor="weight">
            Вес (кг):*
          </label>
          <Input
            id="weight"
            className="form__input-text--weight"
            type="number"
            placeholder="7"
            name="weight"
            required
          />
          <label className="form__label" htmlFor="age">
            Возраст (лет):
          </label>
          <Input id="age" className="form__input-text--age" type="number" placeholder="7" name="age" required />
        </div>
        <div className="form__wrapper-type">
          <input className="form__input-radio" name="type" id="slim" type="radio" value="slim" defaultChecked />

          <label className="form__label" htmlFor="slim">
            <span className="form__custom-radio"></span> Похудение
          </label>
          <br />
          <input className="form__input-radio" name="type" id="gain" type="radio" value="gain" />
          <label className="form__label" htmlFor="gain">
            <span className="form__custom-radio"></span> Набор массы
          </label>
          <br />
          <input className="form__input-radio" name="type" id="advice" type="radio" value="idn" />
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
          <Input className="form__input-text--mail" id="email" type="email" placeholder="example@mail.ru" required />
          <label className="form__label" htmlFor="tel">
            Телефон:*
          </label>
          <InputMask
            mask="+7 (999) 999-99-99"
            className="form__input-text form__input-text-tel"
            id="tel"
            type="tel"
            placeholder="+7 (800) 900-60-90"
            name="tel"
            required
          />
        </div>
      </div>
      <div className="form__comments">
        <h2 className="form__fancy-title">Комментарий</h2>
        <textarea className="form__textarea" placeholder="РАССКАЖИТЕ ОБО ВСЕХ ПОВАДКАХ КОТА" name="comment" />
      </div>
      <div className="form__sup">
        <h2 className="form__fancy-title">Дополнительно</h2>
        <input className="form__input-check" name="sugar" id="sugar" type="checkbox" defaultChecked />
        <label className="form__label" htmlFor="sugar">
          <span className="form__custom-check"></span>Сахарозаменитель
        </label>
        <input className="form__input-check" name="water" id="water" type="checkbox" />
        <label className="form__label" htmlFor="water">
          <span className="form__custom-check"></span>Питьевая вода
        </label>
        <input className="form__input-check" name="milk" id="milk" type="checkbox" />
        <label className="form__label" htmlFor="milk">
          <span className="form__custom-check"></span>Молоко
        </label>
        <input className="form__input-check" name="vitamin" id="vitamin" type="checkbox" />
        <label className="form__label" htmlFor="vitamin">
          <span className="form__custom-check"></span>Витамины
        </label>
      </div>
      <Button size="large" type="submit">
        Отправить заявку
      </Button>
      <p className="form__text">* - Обязательные поля</p>
    </form>
  );
};
