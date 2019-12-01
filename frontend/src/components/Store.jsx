import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from './Header.jsx';
import MainContainer from './MainContainer.jsx';
import Footer from './Footer.jsx';
import Catalog from './Catalog.jsx';
import About from './About.jsx';
import Contacts from './Contacts.jsx';
import Banner from './Banner.jsx';
import Product from './Product.jsx';
import Cart from './Cart.jsx';
import Error404 from './Error404.jsx';

import { fetchTop, fetchCatalog, fetchCategories } from '../actions/actionCreators';

export default function Store() {
    const dispatch = useDispatch();

    const { product, error } = useSelector(state => state.storeState);

    useEffect(() => {
        dispatch(fetchTop());
        dispatch(fetchCatalog());
        dispatch(fetchCategories());
    }, [dispatch])
    
    return (
        <Router>            
            <Route path='/' component={Header} />
            <Route path='/' component={Banner} />
            {error === null ?
                <Switch>
                    <Route path='/about' component={About} />
                    <Route path='/contacts' component={Contacts} />
                    <Route path='/cart' component={Cart} />
                    <Route path={`/catalog/${product.id}`} component={Product} />
                    <Route path='/catalog' component={Catalog} />
                    <Route path='/' component={MainContainer} />
                </Switch>
                : <Route path='/' component={Error404} />
            }
            <Route path='/' component={Footer} />
        </Router>
    );
}