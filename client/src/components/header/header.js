import React, { useContext, useState } from 'react';
import Modal from '../modal/modal';
import {withRouter, NavLink, useHistory} from 'react-router-dom';
import classNames from 'classnames';
import './header.scss';
import logoDesctop from './logo-desktop.png';
import logoTablet from './logo-tablet.png';
import { AuthContext } from '../../context/AuthContext';

const Header = (props) => {
    const {isAuthenticated, logout} = useContext(AuthContext)
    const [openModal, setOpenModal] = useState(false)
    const history = useHistory()
    const path = props.location.pathname
    const links = classNames({
        'header__link': path !== '/card' && path !== '/form' && path !== '/catalog' && path !== '/orders',
        'header__link--alt': path === '/card' || path === '/form' || path === '/catalog' || path === '/orders'
    });
    const active = classNames({
        'header__item--active': path !== '/card' && path !== '/form' && path !== '/catalog' && path !== '/orders',
        'header__item--active--alt': path === '/card' || path === '/form' || path === '/catalog' || path === '/orders'
    });

    return (
        <>
        <nav className='header'>
            <picture>
                <source srcSet={logoTablet} media='(max-width: 768px)'></source>
                <img src={logoDesctop} alt='logo'/>
            </picture>
            <ul className='header__list'>
                <li className='header__item'><NavLink className={links} to='/' activeClassName={active} exact>Главная</NavLink></li>
                <li className='header__item'><NavLink className={links}  to='/catalog' activeClassName={active}>Каталог продукции</NavLink></li>
                {!isAuthenticated && <li className='header__item'><NavLink className={links} to='/form' activeClassName={active}>Подбор программы</NavLink></li>}
                {isAuthenticated && <li className='header__item'><NavLink className={links} to='/card' activeClassName={active}>Корзина</NavLink></li>}
                {isAuthenticated && <li className='header__item'><NavLink className={links} to='/orders' activeClassName={active}>Заказы</NavLink></li>}
                {!isAuthenticated && <li className='header__item'><a className={links} href='/' onClick={evt => {evt.preventDefault(); setOpenModal(!openModal)}}>Вход</a></li>}
                {isAuthenticated && <li className='header__item'><a className={links} href='/' onClick={evt => {evt.preventDefault(); logout(); history.push('/')}}>Выйти</a></li>}
            </ul>
        </nav>
        {openModal && <Modal setCross={setOpenModal}/>}
        </>
    )
}

export default withRouter(Header);