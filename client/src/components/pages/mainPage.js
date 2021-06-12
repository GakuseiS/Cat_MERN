import React from 'react';
import Appeal from '../appeal/appeal';
import Example from '../example/example';
import Features from '../features/features';
import How from '../how/how';

const MainPage = () => {
    return (
        <div className='mainPage'>
            <Appeal />
            <Features />
            <How />            
            <Example />
        </div>
    )
}

export default MainPage;