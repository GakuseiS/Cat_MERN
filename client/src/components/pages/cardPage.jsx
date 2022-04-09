import React, { useCallback, useContext, useEffect, useState, useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Button from '../button/button'
import Loader from '../loader/loader'
import './cardPage.scss'

const CardPage = () => {
    let history = useNavigate()
    const {token} = useContext(AuthContext)
    const [card, setCard] = useState({})
    const [loading, setLoading] = useState(true)
    const mountedRef = useRef(true)
    const getCard = useCallback(() => {
        fetch('/api/card', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (!mountedRef.current) return null
            setCard(data.basket)
            setLoading(false)
            
        })
    }, [token])

    const clearCard = (evt) => {
        evt.preventDefault()
        fetch('/api/card', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
        .then(data => {
            setLoading(true)
        })
        .catch(err => console.log(err))
    }

    const deleteItem = (evt) => {
        fetch('/api/card/' + evt.target.dataset.id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        }).then(res => res.json())
        .then(data => {
            setLoading(true)
        })
        .catch(err => console.log(err))
    }

    const getOrder = (evt) => {
        evt.preventDefault()
        fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(card)
        }).then(res => history('/orders'))
    }

    useEffect(() => {
        getCard()
        return () => {
            mountedRef.current = false
        }
    }, [getCard])

    if (loading) {
        return (
            <div className='cardPage'>
                <Loader />
            </div>
        )
    }

    
    return (
        <div className='cardPage'>
            <h1 className='cardPage__title'>Корзина</h1>
            {!loading && card && card.allPrice !== 0 && <div>
                <ol className='cardPage__list'>
                    {card.items.map(item => <li key={item._id} className='cardPage__item'>{item.title} {item.size} {item.taste} - {item.price} руб. - {item.count} шт. 
                    <button title='Удалить из корзины' data-id={item._id} onClick={deleteItem} className='cardPage__delete'>X</button></li>)}
                </ol>
                {<p className='cardPage__price'>Общая стоимость: {card.allPrice} руб.</p>}
                <form className='cardPage__order' method='POST' onSubmit={getOrder}>
                    <Button>Сделать заказ</Button>
                </form>
                <form className='cardPage__clear' method='POST' onSubmit={clearCard}>
                    <Button>Очистить корзину</Button>
                </form>
                
            </div>}
            {!loading && card.allPrice === 0 && <p>Ваша корзина пуста</p>} 
        </div>
    )
}

export default CardPage