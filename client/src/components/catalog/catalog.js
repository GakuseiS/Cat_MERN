import React, { useCallback, useEffect, useState } from 'react';
import Button from '../button/button';
import CatalogItem from '../catalogItem/catalogItem';
import './catalog.scss';


const Catalog = () => {
    const [cards, setCards] = useState([])
    
    const getCards = useCallback(async () => {
        const cards = await fetch('api/cards', {headers: {'Content-Type': 'application/json'}})
        return await cards.json()
    }, []) 

    useEffect(() => {
        getCards().then(data => setCards(data))
    }, [getCards])

    return (
        <div className='catalog'>
            {cards.map(item => {
                return <CatalogItem key={item._id} title={item.title} img={item.img} size={item.size} taste={item.taste} price={item.price}/>
            })}
            <div className='catalog__more'>
                <h3 className='catalog__more-title'>Показать еще<br /> 100500 товаров</h3>
                <p className='catalog__more-text'>На самом деле вкусов гораздо больше!</p>
                <Button size='small' color='gray'>Показать всё</Button>
            </div>
        </div>
    )
}

export default Catalog;