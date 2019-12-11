import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Preloader from './Preloader.jsx';
import ProductInCart from './ProductInCart.jsx';

import { changeForm, setAgreeAgrements, fetchOrder } from '../actions/actionCreators';

export default function CartPage() {
    const dispatch = useDispatch();
    const { orderSuccess, cart, address, phone, isAgree, loadingOrder } = useSelector(state => state.cartState);

    useEffect(() => {
        dispatch(setAgreeAgrements(false));
        dispatch(changeForm('', 'phone'));
        dispatch(changeForm('', 'address'));
    }, [dispatch])

    const handleInputChange = (event) => {
        dispatch(changeForm(event.target.value, event.target.name))
    }

    const handleAgree = () => {
        dispatch(setAgreeAgrements(true))
    }

    const formSubmit = (event) => {
        event.preventDefault();
        if (phone !== '' && address !== '' && cart.length !== 0 && isAgree) {            
            const order = {
                owner: {
                    phone: phone,
                    address: address,
                },
                items: cart.map(product =>
                    ({
                        id: 1,
                        price: product.price,
                        count: 1,
                    })
                ),
            }
            dispatch(fetchOrder(order));
        }
    }
   
    const totalPrice = cart.reduce((total, current) => {return total + current.price * current.number}, 0)
   
    return (
        <>
            {loadingOrder ? <Preloader /> :
                <main className="container">
                    <div className="row">
                        <div className="col">

                            <section className="cart">
                                <h2 className="text-center">Корзина</h2>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Название</th>
                                            <th scope="col">Размер</th>
                                            <th scope="col">Кол-во</th>
                                            <th scope="col">Стоимость</th>
                                            <th scope="col">Итого</th>
                                            <th scope="col">Действия</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {cart.map(product => <ProductInCart prod={product} key={product.id} />)}
                                        <tr>
                                            <td colSpan="5" className="text-right">Общая стоимость</td>
                                            <td>{totalPrice} руб</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                            <section className="order">
                                {orderSuccess ? <h2 className="text-center">Заказ принят</h2> :
                                    <>
                                        <h2 className="text-center">Оформить заказ</h2>
                                        <div className="card" style={{ 'maxWidth': '30rem', 'margin': '0 auto', }}>
                                            <form onSubmit={formSubmit} className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Телефон</label>
                                                    <input onChange={handleInputChange} value={phone} name="phone" className="form-control" id="phone" placeholder="Ваш телефон" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="address">Адрес доставки</label>
                                                    <input onChange={handleInputChange} value={address} name="address" className="form-control" id="address" placeholder="Адрес доставки" />
                                                </div>
                                                <div className="form-group form-check">
                                                    <input onClick={handleAgree} type="checkbox" className="form-check-input" id="agreement" />
                                                    <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                                                </div>
                                                <button type="submit" className="btn btn-outline-secondary">Оформить</button>
                                            </form>
                                        </div>
                                    </>
                                }
                            </section>
                        </div>
                    </div>
                </main>
            }
        </>
    );
}