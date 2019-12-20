export const FETCH_TOP_REQUEST = 'FETCH_TOP_REQUEST';
export const FETCH_CATALOG_REQUEST = 'FETCH_CATALOG_REQUEST';
export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_TOP_FAILURE = 'FETCH_TOP_FAILURE';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';
export const FETCH_CATALOG_FAILURE = 'FETCH_CATALOG_FAILURE';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const FETCH_TOP_SUCCESS = 'FETCH_TOP_SUCCESS';
export const FETCH_CATALOG_SUCCESS = 'FETCH_CATALOG_SUCCESS';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const FETCH_CATALOG_MORE = 'FETCH_CATALOG_MORE';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CHANGE_HEADER_SEARCH = 'CHANGE_HEADER_SEARCH';
export const CHANGE_FORM = 'CHANGE_FORM';
export const SET_PRODUCT_SIZE = 'SET_PRODUCT_SIZE';
export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const DECREMENT_COUNT = 'DECREMENT_COUNT';
export const ADD_CART = 'ADD_CART';
export const REMOVE_PROD = 'REMOVE_PROD';
export const SET_AGREE = 'SET_AGREE';
export const FETCH_ORDER_REQUEST = 'FETCH_ORDER_REQUEST';
export const FETCH_ORDER_FAILURE = 'FETCH_ORDER_FAILURE';
export const RESET_ERROR = 'RESET_ERROR';

export const resetError = () => ({
  type: RESET_ERROR,
});

export const fetchTopRequest = () => ({
  type: FETCH_TOP_REQUEST,
});

export const fetchCatalogRequest = () => ({
  type: FETCH_CATALOG_REQUEST,
});

export const fetchProductRequest = () => ({
  type: FETCH_PRODUCT_REQUEST,
});

export const fetchOrderRequest = () => ({
  type: FETCH_ORDER_REQUEST,
});

export const fetchTopFailure = errorTop => ({
  type: FETCH_TOP_FAILURE,
  payload: {
    errorTop,
  },
});

export const fetchCatalogFailure = errorCatalog => ({
  type: FETCH_CATALOG_FAILURE,
  payload: {
    errorCatalog,
  },
});

export const fetchOrderFailure = errorOrder => ({
  type: FETCH_ORDER_FAILURE,
  payload: {
    errorOrder,
  },
});

export const fetchProductFailure = errorProduct => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: {
    errorProduct,
  },
});

export const fetchCategoriesFailure = errorCategories => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: {
    errorCategories,
  },
});

export const fetchTopSuccess = topSales => ({
  type: FETCH_TOP_SUCCESS,
  payload: {
    topSales,
  },
});

export const fetchCatalogSuccess = catalog => ({
  type: FETCH_CATALOG_SUCCESS,
  payload: {
    catalog,
  },
});

export const fetchProductSuccess = product => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: {
    product,
  },
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: {
    categories,
  },
});

export const fetchOrderSuccess = () => ({
  type: FETCH_ORDER_SUCCESS,  
});

export const changeCategory = category => ({
  type: CHANGE_CATEGORY,
  payload: {
    category,
  },
});

export const changeHeaderSearch = () => ({
  type: CHANGE_HEADER_SEARCH, 
});

export const changeForm = (value, name) => ({
  type: CHANGE_FORM,
  payload: {
    value,
    name,
  },
});

export const setProductSize = size => ({
  type: SET_PRODUCT_SIZE,
  payload: {
    size,
  },
});

export const incrementCount = () => ({
  type: INCREMENT_COUNT  
});

export const decrementCount = () => ({
  type: DECREMENT_COUNT  
});

export const fetchTop = () => async (dispatch) => {
  dispatch(fetchTopRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/top-sales`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    dispatch(fetchTopSuccess(data));
  } catch (error) {
    dispatch(fetchTopFailure(error.message));
  }
};

export const fetchCatalog = () => async (dispatch) => {
  dispatch(fetchCatalogRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/items`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();    
    dispatch(fetchCatalogSuccess(data));
  } catch (error) {
    dispatch(fetchCatalogFailure(error.message));
  }
};

export const fetchCategories = () => async (dispatch) => {
  
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();    
    dispatch(fetchCategoriesSuccess(data));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};

export const fetchCatalogCategory = (id) => async (dispatch) => {
  dispatch(fetchCatalogRequest());
  dispatch(changeCategory(id));  

  if (id === 16) {
    dispatch(fetchCatalog());
  } else {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/items?categoryId=${id}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      dispatch(fetchCatalogSuccess(data));
    } catch (error) {
      dispatch(fetchCatalogFailure(error.message));
    }
  }
};

export const fetchLoadMore = (catalogLength, category) => async (dispatch) => {
  dispatch(fetchCatalogRequest());

  if(category===16){
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/items?offset=${catalogLength}`);
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const data = await response.json();      
      dispatch(fetchCatalogMore(data));
    } catch (error) {
      dispatch(fetchCatalogFailure(error.message));
    }
  } else{
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/items?categoryId=${category}&offset=${catalogLength}`);
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const data = await response.json(); 
      dispatch(fetchCatalogMore(data));
    } catch (error) {
      dispatch(fetchCatalogFailure(error.message));
    }
  }

};

export const fetchSearch = (category, value) => async (dispatch) => {
  dispatch(fetchCatalogRequest());  

  if(category===16){
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/items?q=${value}`);  
      if (!response.ok) {
        throw new Error(response.statusText);
      }  
      const data = await response.json();      
      dispatch(fetchCatalogSuccess(data));
    } catch (error) {
      dispatch(fetchCatalogFailure(error.message));
    }
  } else{
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/items?categoryId=${category}&q=${value}`);  
      if (!response.ok) {
        throw new Error(response.statusText);
      }  
      const data = await response.json(); 
      dispatch(fetchCatalogSuccess(data));
    } catch (error) {
      dispatch(fetchCatalogFailure(error.message));
    } 
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  dispatch(fetchProductRequest());  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/items/${id}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      dispatch(fetchProductSuccess(data));
    } catch (error) {
      dispatch(fetchProductFailure(error.message));
    }
  
};

export const fetchOrder = (order) => async (dispatch) => {
  dispatch(fetchOrderRequest());  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
        method: 'POST',
        body: JSON.stringify(order)       
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    
      dispatch(fetchOrderSuccess());      
    } catch (error) {
      dispatch(fetchOrderFailure(error.message));
    } finally {
      localStorage.clear();
      dispatch(addCart(false));
      
    }
  
};

export const fetchCatalogMore = catalogMore => ({
  type: FETCH_CATALOG_MORE,
  payload: {
    catalogMore,
  },
});

export const addCart = newProduct => ({
  type: ADD_CART,
  payload: {
    newProduct,
  },
});

export const removeProd = removeId => ({
  type: REMOVE_PROD,
  payload: {
    removeId,
  },
});

export const setAgreeAgrements = (init) => ({
  type: SET_AGREE, 
  payload: {
    init,
  },
});



