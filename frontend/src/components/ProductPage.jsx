import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Preloader from './Preloader.jsx';
import { stateCartSelector } from './stateCartSelector.js';

import { setProductSize, incrementCount, decrementCount, addCart } from '../actions/actionCreators';

export default function ProductPage() {
    const dispatch = useDispatch();   
    const { product, selectSize, selectCount, loadingProduct } = useSelector(state => stateCartSelector(state));
    
    const selectProductSize = (size) => {
        dispatch(setProductSize(size))
    }

    const incrementProductCount = () => {
        dispatch(incrementCount())
    }

    const decrementProductCount = () => {
        dispatch(decrementCount())
    }

    const writeToCart = (prod) => {
        dispatch(addCart(prod))
    }

    const prodToCart = {
        id: product.id,
        title: product.title,
        size: selectSize,
        number: selectCount,
        price: product.price
    }

    return (
        <>
            {loadingProduct ? <Preloader /> :
                <main className="container">
                    <div className="row">
                        <div className="col">
                            <section className="catalog-item">
                                <h2 className="text-center">{product.title}</h2>
                                <div className="row">
                                    <div className="col-5">
                                        <img src={product.images[0]}
                                            className="img-fluid" alt="" />
                                    </div>
                                    <div className="col-7">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td>Артикул</td>
                                                    <td>{product.sku}</td>
                                                </tr>
                                                <tr>
                                                    <td>Производитель</td>
                                                    <td>{product.manufacturer}</td>
                                                </tr>
                                                <tr>
                                                    <td>Цвет</td>
                                                    <td>{product.color}</td>
                                                </tr>
                                                <tr>
                                                    <td>Материалы</td>
                                                    <td>{product.material}</td>
                                                </tr>
                                                <tr>
                                                    <td>Сезон</td>
                                                    <td>{product.season}</td>
                                                </tr>
                                                <tr>
                                                    <td>Повод</td>
                                                    <td>{product.reason}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="text-center">
                                            <p>Размеры в наличии:
                                        {product.sizes.filter(size => size.avalible = true).map(size =>
                                                <span
                                                    key={size.size}
                                                    onClick={() => selectProductSize(size.size)}
                                                    className={`catalog-item-size ${size.size === selectSize ? 'selected' : ''}`}>
                                                    {size.size}
                                                </span>)}
                                            </p>
                                            {product.sizes.filter(size => size.avalible = true).length > 0 ?
                                                <>
                                                    <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                                        <button onClick={decrementProductCount} className="btn btn-secondary">-</button>
                                                        <span className="btn btn-outline-primary">{selectCount}</span>
                                                        <button onClick={incrementProductCount} className="btn btn-secondary">+</button>
                                                    </span>
                                                    </p>
                                                    {selectSize != null ?
                                                        <Link to='/cart' onClick={() => writeToCart(prodToCart)} className="btn btn-danger btn-block btn-lg">В корзину</Link>
                                                        : null}
                                                </>
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            }
        </>
    );
}