import React, { useState } from "react";
import Button from "../button/button";
import "./form.scss";

const Form = () => {
  const [status, setStatus] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    let object = {};
    formData.forEach((value, key) => (object[key] = value));
    let json = JSON.stringify(object);
    try {
      const { status } = await fetch("api/form", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (status === 200) {
        window.scrollTo(0, 0);
        setStatus(true);
        event.target.reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {status ? <p className="form__success">Ваши данные отправлены на сервер. Ожидайте нашего звонка.</p> : null}
      <form className="form" onSubmit={submitHandler}>
        <h3 className="form__title">Заполните анкету и мы подберем программу питания для вашего кота</h3>
        <div className="form__wrapper">
          <div className="form__wrapper-name">
            <label className="form__label" htmlFor="name">
              Имя:*
            </label>
            <input
              className="form__input-text form__input-text--name"
              id="name"
              type="text"
              placeholder="БАРСИК"
              name="name"
              required
            />
            <label className="form__label" htmlFor="weight">
              Вес (кг):*
            </label>
            <input
              className="form__input-text form__input-text--weight"
              id="weight"
              type="number"
              min="0"
              placeholder="7"
              name="weight"
              required
            />
            <label className="form__label" htmlFor="age">
              Возраст (лет):
            </label>
            <input
              className="form__input-text form__input-text--age"
              id="age"
              type="number"
              min="0"
              placeholder="7"
              name="age"
            />
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
            <label className="form__label" htmlFor="mail">
              E-mail:*
            </label>
            <input
              className="form__input-text form__input-text-mail"
              id="mail"
              type="email"
              placeholder="example@gmail.com"
              name="email"
              required
            />
            <label className="form__label" htmlFor="tel">
              Телефон:*
            </label>
            <input
              className="form__input-text form__input-text-tel"
              id="tel"
              type="tel"
              placeholder="8 (800) 900-60-90"
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
    </>
  );
};

export default Form;
