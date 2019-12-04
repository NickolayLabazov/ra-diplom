import React from 'react';

import Card from './Card.jsx';

export default function ProductBox(props) {
    return (
        <div className="row">
            {props.products.map(prod => <Card prod={prod} key={prod.id} />)}
        </div>
    );
}