import React, { useContext } from 'react';
import Button from '../button/button';
import {AuthContext} from '../../context/AuthContext'
import './catalogItem.scss';
import ErrorContext from '../../context/ErrorContext';

const CatalogItem = ({id, title, img, size, taste, price}) => {
    const {token} = useContext(AuthContext)
    const {errorMessage} = useContext(ErrorContext)
    
     const getId = (evt) => {
        evt.preventDefault()
    
        fetch('/api/card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({id})
        })
            .then(res => res.json())
            .then(data => errorMessage(data.message))
    }
    return (
        <div className='catalogItem'>
            <div className='catalogItem__wrapper'>   
                <img className='catalogItem__img' src={img} alt='pack'/>
            </div>
            
            <h3 className='catalogItem__title'>{title}<br />{size}</h3>
            <ul className='catalogItem__list'>
                <li className='catalogItem__list-item'>Объем <span>{size}</span></li>
                <li className='catalogItem__list-item'>Вкус <span>{taste}</span></li>
                <li className='catalogItem__list-item'>Цена <span>{price} Р.</span></li>
            </ul>
            <form onSubmit={getId}>
                <Button size='small' page='catalog'>Заказать</Button>
            </form>
            
        </div>
    )
}



export default CatalogItem;