import React, { useEffect, useState } from 'react';
import Button from '../button/button';
import './supplement.scss';

const Supplement = () => {
    const [addons, setAddons] = useState()
    const [loading, setLoading] = useState(true)

    const getId = (evt) => {
        evt.preventDefault()
        const id = evt.currentTarget.dataset.id

        fetch('/api/card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {id} )
        })
    }

    useEffect(() => {
        fetch('/api/addons')
            .then(res => res.json())
            .then(data => {
                setAddons(data.addons)
                setLoading(false)
            })
    }, [])
    return (
        <div className='sup'>
            <h2 className='sup__title'>Дополнительные товары</h2>
            <div className='sup__content'>
                <ul className='sup__list'>
                    {!loading && addons.map(addon => {
                        return <li key={addon._id} className='sup__list-item'>
                            <span className='sup__item-title'>{addon.title}</span> <span className='sup__size'>{addon.size}</span> <span className='sup__price'>{addon.price} Р.</span> 
                            <form className='sup__form' method='POST' onSubmit={getId} data-id={addon._id}><Button page='catalog'>Заказать</Button></form>
                        </li>
                    })}
                </ul>
                <div className='sup__all'>
                    <p className='sup__all-text'>Закажите все<br /> и получите чехол для кота в подарок!</p>
                </div>
            </div>
        </div>
    )
}

export default Supplement;