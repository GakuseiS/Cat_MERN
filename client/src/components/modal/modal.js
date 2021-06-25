import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import ErrorContext from '../../context/ErrorContext'
import Button from '../button/button'
import {useHistory} from 'react-router-dom'
import './modal.scss'

const Modal = ({setCross}) => {
    const [switcher, setSwitcher] = useState(true)
    const {login} = useContext(AuthContext)
    const {errorMessage} = useContext(ErrorContext)
    const history = useHistory()

    const getRegister = evt => {
        evt.preventDefault()
        const obj = {}
        const data = new FormData(evt.target)
        data.forEach((item, i) => {
            obj[i] = item
        })

        fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(res => {
            return res.json()
        }).then(data => {
            errorMessage(data.message)
        })
    }

    const getLogin = evt => {
        evt.preventDefault()
        const obj = {}
        const data = new FormData(evt.target)
        data.forEach((item, i) => {
            obj[i] = item
        })

        fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(res => {
                if(!res.ok) throw new Error('Такого логина или пароля не существует.')
                return res.json()
            })
            .then(data => {
                login(data.token, data.userId)
                setCross(false)
                history.push('/')
            })
            .catch(err => errorMessage(err.toString()))
    }

    return (
        <div className='modal'>
            <h2 className='modal__title'>Личный кабинет</h2>
            <div className='modal__switches'>
                <a className='modal__switch' href='/' onClick={evt => {evt.preventDefault(); setSwitcher(true)}}>Войти</a>
                <a className='modal__switch' href='/' onClick={evt => {evt.preventDefault(); setSwitcher(false)}}>Зарегистрироваться</a>
            </div>
            {switcher && <form className='modal__login' onSubmit={getLogin}>
                <p className='modal__text'>Введите свой логин и пароль, чтобы войти</p>
                <input className='modal__input-text' name='email' placeholder='Логин' type='email' minLength='3' required/>
                <input className='modal__input-text' name='password' placeholder='Пароль' type='password' minLength='6' required/>
                <div className='modal__wrapper'>
                    <Button>Войти в личный кабинет</Button>
                </div>
            </form>}
            {!switcher && <form className='modal__register' onSubmit={getRegister}>
                <p className='modal__text'>Введите свои данные, чтобы зарегистрироваться</p>
                <input className='modal__input-text' name='name' placeholder='Имя' type='text' minLength='3' required/>
                <input className='modal__input-text' name='email' placeholder='Логин' type='email' required/>
                <input className='modal__input-text' name='password' placeholder='Пароль' type='password' minLength='6' required/>
                <div className='modal__wrapper'>
                    <Button>Зарегистрироваться</Button>
                </div>
            </form>}
            <span className='modal__cross' onClick={evt => setCross(false)}>X</span>
        </div>
    )
}

export default Modal