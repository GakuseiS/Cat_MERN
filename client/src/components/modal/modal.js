import React, { useState } from 'react'
import Button from '../button/button'
import './modal.scss'

const Modal = ({setCross}) => {
    const [login, setLogin] = useState(true)
    return (
        <div className='modal'>
            <h2 className='modal__title'>Личный кабинет</h2>
            <div className='modal__switches'>
                <a className='modal__switch' href='/' onClick={evt => {evt.preventDefault(); setLogin(true)}}>Войти</a>
                <a className='modal__switch' href='/' onClick={evt => {evt.preventDefault(); setLogin(false)}}>Зарегистрироваться</a>
            </div>
            {login && <form className='modal__login'>
                <p className='modal__text'>Введите свой логин и пароль, чтобы войти</p>
                <input className='modal__input-text' name='login' placeholder='Логин' />
                <input className='modal__input-text' name='password' placeholder='Пароль' />
                <div className='modal__wrapper'>
                    <Button>Войти в личный кабинет</Button>
                </div>
            </form>}
            {!login && <form className='modal__register'>
                <p className='modal__text'>Введите свои данные, чтобы зарегистрироваться</p>
                <input className='modal__input-text' name='name' placeholder='Имя' />
                <input className='modal__input-text' name='login' placeholder='Логин' />
                <input className='modal__input-text' name='password' placeholder='Пароль' />
                <div className='modal__wrapper'>
                    <Button>Зарегистрироваться</Button>
                </div>
            </form>}
            <span className='modal__cross' onClick={evt => setCross(false)}>X</span>
        </div>
    )
}

export default Modal