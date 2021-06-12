import React from 'react';
import Button from '../button/button';
import './supplement.scss';

const Supplement = () => {
    return (
        <div className='sup'>
            <h2 className='sup__title'>Дополнительные товары</h2>
            <div className='sup__content'>
                <ul className='sup__list'>
                    <li className='sup__list-item'>
                        <span className='sup__item-title'>Сахарозаменитель</span> <span className='sup__size'>1 упаковка (100 г)</span> <span className='sup__price'>200 Р.</span> <Button page='catalog'>Заказать</Button>
                    </li>
                    <li className='sup__list-item'>
                        <span className='sup__item-title'>Питьевая вода</span> <span className='sup__size'>5 литров</span> <span className='sup__price'>50 Р.</span> <Button page='catalog'>Заказать</Button>
                    </li>
                    <li className='sup__list-item'>
                        <span className='sup__item-title'>Молоко</span> <span className='sup__size'>1 литр</span> <span className='sup__price'>100 Р.</span> <Button page='catalog'>Заказать</Button>
                    </li>
                    <li className='sup__list-item'>
                        <span className='sup__item-title'>Витамины</span> <span className='sup__size'>1 упаковка (30 г)</span> <span className='sup__price'>300 Р.</span> <Button page='catalog'>Заказать</Button>
                    </li>
                </ul>
                <div className='sup__all'>
                    <p className='sup__all-text'>Закажите все<br /> и получите чехол для кота в подарок!</p>
                </div>
            </div>
        </div>
    )
}

export default Supplement;