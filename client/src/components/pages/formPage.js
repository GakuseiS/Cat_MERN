import React from 'react';
import Form from '../form/form';
import './formPage.scss';

const FormPage = () => {
    return (
        <div className='formPage'>
            <h1 className='formPage__title'>Подбор программы</h1> 
            <Form />
        </div>
    )
}

export default FormPage;