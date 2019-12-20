import React from 'react';
import { useSelector } from 'react-redux';

import Preloader from './Preloader.jsx';
import ProductBox from './ProductBox.jsx';
import CatalogCategories from './CatalogCategories.jsx';
import ActionButton from './ActionButton.jsx';
import { stateStoreSelector } from './stateStoreSelector.js';


export default function MainPage() {
    const { loadingTopSales, loadingCatalog, topSales, catalog, } = useSelector(state => stateStoreSelector(state));
    return (
        <>
            <main className="container">
                <div className="row">
                    <div className="col">
                        <section className="top-sales">
                            <h2 className="text-center">Хиты продаж!</h2>
                            {loadingTopSales ? <Preloader /> : <ProductBox products={topSales} />}
                        </section>
                        <section className="catalog">
                            <h2 className="text-center">Каталог</h2>
                            {loadingCatalog ? <Preloader /> :
                                <>
                                    <CatalogCategories url='/' />
                                    <ProductBox products={catalog} />
                                    <ActionButton />
                                </>
                            }
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}