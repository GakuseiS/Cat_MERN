import React, { useEffect, useState } from 'react'
import './range.scss'


const Range = ({setRange}) => {
    const [pos, setPos] = useState(200)
    
    useEffect(() => {
        setRange(pos/4)
    }, [pos, setRange])

    const changePosition = (evt) => {
        let x = pos
        const rect = evt.target.getBoundingClientRect()
        let position = rect.left + 15

        const moveListener = (evt) => {
            if(x <= 3) {
                x = 4
                return setPos(4)
            }

            if(x >= 381) {
                x = 380
                return setPos(380)
            }
            
            let shift = evt.clientX - position
            position += shift
            x += shift
            if(x > 0 && x < 400) setPos(x)
        }

        evt.target.addEventListener('pointermove', moveListener)

        document.addEventListener('pointerup', () => {
            evt.target.removeEventListener('pointermove', moveListener)
            evt.target.removeEventListener('pointerdown', moveListener)
        })
    }

    return (
        <div className='range'>
            <span className='range__label' onClick={() => setPos(4)}>Было</span>
            <div className='range__line'>
                <div className='range__dot' onPointerDown={changePosition} style={{left: `${pos}px`}}></div>
            </div>
            <span className='range__label' onClick={() => setPos(380)}>Стало</span>
        </div>
    )
}

export default Range