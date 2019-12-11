import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoadMore } from '../actions/actionCreators';

export default function ActionButton() {
    const dispatch = useDispatch();
    const { catalog, btnLoadMore, loadingCatalog, category } = useSelector(state => state.storeState);

    const loadMore = (catalogLength, category) => {
        dispatch(fetchLoadMore(catalogLength, category));
    }

    return (
        <>
            {(!loadingCatalog && btnLoadMore) ?
                <div className="text-center">
                    <button className="btn btn-outline-primary" onClick={() => loadMore(catalog.length, category)}>Загрузить ещё</button>
                </div>
                : null}
        </>
    );
}