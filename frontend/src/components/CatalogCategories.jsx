import React from 'react';
import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCatalogCategory } from '../actions/actionCreators';

export default function CatalogCategories(props) {
    const { categories } = useSelector(state => state.storeState);
    const dispatch = useDispatch();

    const selectCat = (id) => {
        dispatch(fetchCatalogCategory(id));
    }

    return (
        <nav className="catalog-categories nav justify-content-center">
            {categories.map(cat =>
                <NavLink
                    className="nav-link"
                    activeClass='active'
                    to={`${props.url}${cat.id}`}
                    onClick={() => selectCat(cat.id)}>{cat.title}
                </NavLink>
            )}
        </nav>
    );
}