import React from 'react';
import {  Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchProduct } from '../actions/actionCreators';

export default function Card(props) {
    const dispatch = useDispatch();

    const loadProd = (id) => {
        dispatch(fetchProduct(id))
    }

    return (

        <div className="col-4">
            <div className="card catalog-item-card">
                <img src={props.prod.images[0]}
                    className="card-img-top img-fluid imgCard" alt="Босоножки 'MYER'" />
                <div className="card-body">
                    <p className="card-text">{props.prod.title}</p>
                    <Link onClick={() => loadProd(props.prod.id)} to={`/catalog/${props.prod.id}`} className="btn btn-outline-primary">Заказать</Link>
                </div>
            </div>
        </div>
    );
}