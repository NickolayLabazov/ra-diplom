import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CatalogCategories from './CatalogCategories.jsx';
import ProductBox from './ProductBox.jsx';
import ActionButton from './ActionButton.jsx';

import { changeForm, fetchSearch } from '../actions/actionCreators';

export default function CatalogPage() {
    const dispatch = useDispatch();
    const { catalog, catalogValue, category } = useSelector(state => state.storeState);

    const handleInputChange = (event) => {
        dispatch(changeForm(event.target.value, event.target.name))
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchSearch(category, catalogValue));
    }

    return (
        <>
            <main className="container">
                <div className="row">
                    <div className="col">

                        <section className="catalog">
                            <h2 className="text-center">Каталог</h2>
                            <form onSubmit={handleFormSubmit} className="catalog-search-form form-inline">
                                <input name='catalogValue' value={catalogValue} onChange={handleInputChange} className="form-control" placeholder="Поиск" />
                            </form>
                            {
                                <>
                                    <CatalogCategories url='/catalog/' />
                                    <ProductBox products={catalog} />
                                </>
                            }
                            <ActionButton />
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}