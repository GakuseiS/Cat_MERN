import React from 'react'
import './message.scss'

const Message = (props) => {
    return (
        <div className='message'>
            {props.children}
        </div>
    )
}

export default Message