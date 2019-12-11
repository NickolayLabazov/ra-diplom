import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import headerLogo from '../img/header-logo.png';
import { changeHeaderSearch, changeForm, fetchSearch, resetError } from '../actions/actionCreators';

export default function HeaderPage() {
    const dispatch = useDispatch();
    const { headerSearch, formValue, category } = useSelector(state => state.storeState);
    const { cart } = useSelector(state => state.cartState);

    const active = {
        color: '#ff0000',
    }

    const search = () => {
        dispatch(changeHeaderSearch());
        dispatch(resetError());
        if (!headerSearch && formValue != '') {
            dispatch(fetchSearch(category, formValue))
        }
    }

    const handleInputChange = (event) => {
        dispatch(changeForm(event.target.value, event.target.name))
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    const reset = () => {
        dispatch(resetError());
    }

    return (
        <>
            <header className="container">
                <div className="row">
                    <div className="col">
                        <nav className="navbar navbar-expand-sm navbar-light bg-light">
                            <Link className="navbar-brand" to="/" onClick={reset}>
                                <img src={headerLogo} alt="Bosa Noga" />
                            </Link>
                            <div className="collapase navbar-collapse" id="navbarMain">
                                <nav className="navbar-nav mr-auto">
                                    <NavLink className="nav-link" activeStyle={active} exact to="/" onClick={reset}>Главная</NavLink>
                                    <NavLink className="nav-link" activeStyle={active} exact to="/catalog" onClick={reset}>Каталог</NavLink>
                                    <NavLink className="nav-link" activeStyle={active} exact to="/about" onClick={reset}>О магазине</NavLink>
                                    <NavLink className="nav-link" activeStyle={active} exact to="/contacts" onClick={reset}>Контакты</NavLink>
                                </nav>
                                <div>
                                    <div className="header-controls-pics">
                                        {(!headerSearch && formValue != '') ?
                                            <NavLink onClick={search} className="header-controls-pic header-controls-search" exact to="/catalog"></NavLink> :
                                            <div onClick={search} data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                                        }


                                        <Link to='/cart' className="header-controls-pic header-controls-cart" onClick={reset}>
                                            {cart.length > 0 ?
                                                <div className="header-controls-cart-full">{cart.length}</div> : null}
                                            <div className="header-controls-cart-menu"></div>
                                        </Link>
                                    </div>
                                    <form onSubmit={handleFormSubmit} data-id="search-form" className={`header-controls-search-form form-inline ${headerSearch ? 'invisible' : null}`}>
                                        <input name='formValue' value={formValue} onChange={handleInputChange} className="form-control" placeholder="Поиск" />
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