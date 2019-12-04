import {
  I_AGREE,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_FAILURE,
  ERROR_NULL,
  CHANGE_FORM,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  ADD_CART,
  REMOVE_PROD,
  PRODUCT_SIZE,
  INCREASE_NUMBER,
  LOWER_NUMBER,
} from '../actions/actionCreators';

const initialState = {
  isAgree: false,
  orderSuccess: false,
  address: '',
  phone: '',
  cart: [],
  loadingOrder: false,
  selectSize: null,
  selectNumber: 1,
  product: {},
  loadingProduct: false,
  error: null,
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDER_REQUEST:
      return {
        ...state,
        loadingOrder: true,
        error: null,
      }
    case FETCH_ORDER_FAILURE:
      const { errorOrder } = action.payload;
      return {
        ...state,
        loadingOrder: false,
        error: errorOrder,
        address: '',
        phone: '',
      }
    case I_AGREE:
      const { init } = action.payload;
      return {
        ...state,
        isAgree: init ? !state.isAgree : false,
      }
    case FETCH_ORDER_SUCCESS:
      return {
        ...state,
        cart: [],
        orderSuccess: true,
        loadingOrder: false,
        address: '',
        phone: '',
      }
    case ERROR_NULL:
      return {
        ...state,
        orderSuccess: false,
        error: null,
      }
    case CHANGE_FORM:
      const { value, name } = action.payload;
      return {
        ...state,
        [name]: value,
      }
    case FETCH_PRODUCT_SUCCESS:
      const { product } = action.payload;
      return {
        ...state,
        product,
        loadingProduct: false,
        error: null,
        selectSize: null,
        selectNumber: 1,
      };
    case ADD_CART:
      const { prod } = action.payload;
      const index = state.cart.indexOf(state.cart.filter(o => o.id == prod.id).filter(o => o.size = prod.size)[0]);
      if (index === -1) {
        return {
          ...state,
          cart: state.cart.concat([prod]),
          selectSize: null,
          selectNumber: 1,
        }
      } else {
        return {
          ...state,
          cart: state.cart.map(product =>
            (product.id === prod.id) && (product.size === prod.size) ?
              { ...product, number: prod.number + product.number } : product),
          selectSize: null,
          selectNumber: 1,
        }
      }
    case REMOVE_PROD:
      const { removeId } = action.payload;
      return {
        ...state,
        cart: state.cart.filter(prod => prod.id != removeId)
      }
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loadingProduct: true,
        error: null,
      }
    case FETCH_PRODUCT_FAILURE:
      const { errorProduct } = action.payload;
      return {
        ...state,
        loadingProduct: false,
        error: errorProduct
      }
    case PRODUCT_SIZE:
      const { size } = action.payload;
      return {
        ...state,
        selectSize: size,
      }
    case INCREASE_NUMBER:
      return {
        ...state,
        selectNumber: state.selectNumber < 10 ? state.selectNumber + 1 : state.selectNumber,
      }
    case LOWER_NUMBER:
      return {
        ...state,
        selectNumber: state.selectNumber > 1 ? state.selectNumber - 1 : state.selectNumber,
      }

    default:
      return state;
  }
}


