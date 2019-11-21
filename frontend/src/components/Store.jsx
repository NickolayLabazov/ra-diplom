import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header.jsx';
import MainContainer from './MainContainer.jsx';
import Footer from './Footer.jsx';
import Catalog from './Catalog.jsx';
import About from './About.jsx';
import Contacts from './Contacts.jsx';
import Banner from './Banner.jsx';

export default function Store(){
    return (
        <Router>
            <Route path='/' component={Header}/>
            <Route path='/' component={Banner}/>
            <Route exact path='/' component={MainContainer}/>
            <Route path='/catalog' component={Catalog}/>
            <Route path='/about' component={About}/>
            <Route path='/contacts' component={Contacts}/>


            <Route path='/' component={Footer}/> 

    </Router>
    );
}