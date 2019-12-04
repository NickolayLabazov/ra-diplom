import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { removeProd } from '../actions/actionCreators';

export default function ProductInCart(props) {    
    const { cart } = useSelector(state => state.cartState);
    const dispatch = useDispatch();

    const removeProduct = (id) => {
        dispatch(removeProd(id));
    }

    const index = cart.indexOf(props.prod) + 1;

    return (
        <tr>
            <th scope="row">{index}</th>
            <td><a href="/products/1.html">{props.prod.title}</a></td>
            <td>{props.prod.size}</td>
            <td>{props.prod.number}</td>
            <td>{props.prod.price} руб</td>
            <td>{props.prod.price * props.prod.number} руб</td>
            <td><button onClick={() => removeProduct(props.prod.id)} className="btn btn-outline-danger btn-sm">Удалить</button></td>
        </tr>
    );
}