import React from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCatalogCategory } from '../actions/actionCreators';

import {stateStoreSelector} from './stateStoreSelector.js';

export default function CatalogCategories(props) {
    const { categories } = useSelector(state => stateStoreSelector(state));
    const dispatch = useDispatch();

    const selectCat = (id) => {
        dispatch(fetchCatalogCategory(id));
    }

    return (
        <nav className="catalog-categories nav justify-content-center">
            {categories.map(cat =>
                <NavLink
                    key={cat.id}
                    className="nav-link"
                    activeclass='active'
                    to={`${props.url}${cat.id}`}
                    //to={`${props.url}`}
                    onClick={() => selectCat(cat.id)}>{cat.title}
                </NavLink>
            )}
        </nav>
    );
}