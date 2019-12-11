import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

import HeaderPage from './components/HeaderPage.jsx';
import MainPage from './components/MainPage.jsx';
import FooterPage from './components/FooterPage.jsx';
import CatalogPage from './components/CatalogPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import ContactsPage from './components/ContactsPage.jsx';
import BannerPage from './components/BannerPage.jsx';
import ProductPage from './components/ProductPage.jsx';
import CartPage from './components/CartPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';

import { fetchTop, fetchCatalog, fetchCategories } from './actions/actionCreators';

export default function App() {
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









/* import React from 'react';
import RouterPage from './components/RouterPage.jsx';
import './App.css';

function App() {
  return (
    <RouterPage/>     
  );
}

export default App;
 */