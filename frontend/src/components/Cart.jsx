import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Preloader from './Preloader.jsx';
import ProductInCart from './ProductInCart.jsx';

import { changeForm, iAgree, fetchOrder } from '../actions/actionCreators';

export default function Cart() {
    const dispatch = useDispatch();
    const { orderSuccess, cart, address, phone, isAgree, loadingOrder } = useSelector(state => state.storeState);

    useEffect(() => {
        dispatch(iAgree(false));
        dispatch(changeForm('', 'phone'));
        dispatch(changeForm('', 'address'));
    }, [dispatch])

    const inputChange = (event) => {
        dispatch(changeForm(event.target.value, event.target.name))
    }

    const agree = () => {
        dispatch(iAgree(true))
    }

    const formSubmit = (event) => {
        event.preventDefault();
        if (phone !== '' && address !== '' && cart.length !== 0 && isAgree) {            
            const order = {
                owner: {
                    phone: phone,
                    address: address,
                },
                items: cart.map(prod =>
                    ({
                        id: 1,
                        price: prod.price,
                        count: 1,
                    })
                ),
            }
            dispatch(fetchOrder(order));
        }
    }

    let totalPrice = 0;
    cart.map(prod => totalPrice = totalPrice + prod.price * prod.number);

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
                                        {cart.map(prod => <ProductInCart prod={prod} />)}
                                        <tr>
                                            <td colspan="5" className="text-right">Общая стоимость</td>
                                            <td>{totalPrice} руб</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                            <section className="order">
                                {orderSuccess ? <h2 className="text-center">Заказ принят</h2> :
                                    <>
                                        <h2 className="text-center">Оформить заказ</h2>
                                        <div className="card" style={{ 'max-width': '30rem', 'margin': '0 auto', }}>
                                            <form onSubmit={formSubmit} className="card-body">
                                                <div className="form-group">
                                                    <label for="phone">Телефон</label>
                                                    <input onChange={inputChange} value={phone} name="phone" className="form-control" id="phone" placeholder="Ваш телефон" />
                                                </div>
                                                <div className="form-group">
                                                    <label for="address">Адрес доставки</label>
                                                    <input onChange={inputChange} value={address} name="address" className="form-control" id="address" placeholder="Адрес доставки" />
                                                </div>
                                                <div className="form-group form-check">
                                                    <input onClick={agree} type="checkbox" className="form-check-input" id="agreement" />
                                                    <label className="form-check-label" for="agreement">Согласен с правилами доставки</label>
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