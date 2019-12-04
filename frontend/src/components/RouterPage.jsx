import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import HeaderPage from './HeaderPage.jsx';
import MainPage from './MainPage.jsx';
import FooterPage from './FooterPage.jsx';
import CatalogPage from './CatalogPage.jsx';
import AboutPage from './AboutPage.jsx';
import ContactsPage from './ContactsPage.jsx';
import BannerPage from './BannerPage.jsx';
import ProductPage from './ProductPage.jsx';
import CartPage from './CartPage.jsx';
import ErrorPage from './ErrorPage.jsx';

import { fetchTop, fetchCatalog, fetchCategories } from '../actions/actionCreators';

export default function RouterPage() {
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.storeState);
   
    useEffect(() => {
        dispatch(fetchTop());
        dispatch(fetchCatalog());
        dispatch(fetchCategories());
    }, [dispatch])
    
    return (
        <Router>            
            <Route path='/' component={HeaderPage} />
            <Route path='/' component={BannerPage} />
            {error === null ?
                <Switch>
                    <Route path='/about' component={AboutPage} />
                    <Route path='/contacts' component={ContactsPage} />
                    <Route path='/cart' component={CartPage} />
                    <Route path={`/catalog/:productId`} component={ProductPage} />
                    <Route path='/catalog' component={CatalogPage} />
                    <Route path='/' component={MainPage} />
                </Switch>
                : <Route path='/' component={ErrorPage} />
            }
            <Route path='/' component={FooterPage} />
        </Router>
    );
}