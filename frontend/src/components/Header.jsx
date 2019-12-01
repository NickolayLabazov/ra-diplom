import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import headerLogo from '../img/header-logo.png';
import { changeHeaderSearch, changeForm, fetchSearch, errorNull } from '../actions/actionCreators';

export default function Header() {
    const dispatch = useDispatch();
    const { headerSearch, formValue, category, cart } = useSelector(state => state.storeState);

    let active = {
        color: '#ff0000',
    }

    const search = () => {
        dispatch(changeHeaderSearch());
        dispatch(errorNull());
        if (!headerSearch && formValue != '') {
            dispatch(fetchSearch(category, formValue))
        }
    }

    const inputChange = (event) => {
        dispatch(changeForm(event.target.value, event.target.name))
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    const nullError = () => {
        dispatch(errorNull());
    }

    return (
        <>
            <header className="container">
                <div className="row">
                    <div className="col">
                        <nav className="navbar navbar-expand-sm navbar-light bg-light">
                            <Link className="navbar-brand" to="/" onClick={nullError}>
                                <img src={headerLogo} alt="Bosa Noga" />
                            </Link>
                            <div className="collapase navbar-collapse" id="navbarMain">
                                <nav className="navbar-nav mr-auto">
                                    <NavLink className="nav-link" activeStyle={active} exact to="/" onClick={nullError}>Главная</NavLink>
                                    <NavLink className="nav-link" activeStyle={active} exact to="/catalog" onClick={nullError}>Каталог</NavLink>
                                    <NavLink className="nav-link" activeStyle={active} exact to="/about" onClick={nullError}>О магазине</NavLink>
                                    <NavLink className="nav-link" activeStyle={active} exact to="/contacts" onClick={nullError}>Контакты</NavLink>
                                </nav>
                                <div>
                                    <div className="header-controls-pics">
                                        {(!headerSearch && formValue != '') ?
                                            <NavLink onClick={search} className="header-controls-pic header-controls-search" exact to="/catalog"></NavLink> :
                                            <div onClick={search} data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                                        }


                                        <Link to='/cart' className="header-controls-pic header-controls-cart" onClick={nullError}>
                                            {cart.length > 0 ?
                                                <div className="header-controls-cart-full">{cart.length}</div> : null}
                                            <div className="header-controls-cart-menu"></div>
                                        </Link>
                                    </div>
                                    <form onSubmit={formSubmit} data-id="search-form" className={`header-controls-search-form form-inline ${headerSearch ? 'invisible' : null}`}>
                                        <input name='formValue' value={formValue} onChange={inputChange} className="form-control" placeholder="Поиск" />
                                    </form>
                                </div>
                            </div>
                        </nav>

                    </div>
                </div>
            </header>
        </>
    );
}