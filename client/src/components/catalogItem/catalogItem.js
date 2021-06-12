import React from 'react';
import Button from '../button/button';
import './catalogItem.scss';

const CatalogItem = ({title, img, size, taste, price}) => {
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
            <Button size='small' page='catalog'>Заказать</Button>
        </div>
    )
}



export default CatalogItem;