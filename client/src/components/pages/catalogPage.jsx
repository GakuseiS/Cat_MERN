import React, { useEffect } from 'react';
import './catalogPage.scss';
import Catalog from '../catalog/catalog';
import Supplement from '../supplement/supplement';

const CatalogPage = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div className='catalogPage'>
            <h1 className='catalogPage__title'>Каталог продукции</h1>
            <Catalog />
            <Supplement />
        </div>
    )
}

export default CatalogPage;