import {
  SET_AGREE,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_FAILURE,
  RESET_ERROR,
  CHANGE_FORM,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  ADD_CART,
  REMOVE_PROD,
  SET_PRODUCT_SIZE,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
} from '../actions/actionCreators';

const initialState = {
  isAgree: false,
  orderSuccess: false,
  address: '',
  phone: '',
  cart: [],
  loadingOrder: false,
  selectSize: null,
  selectCount: 1,
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
    case SET_AGREE:
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
    case RESET_ERROR:
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
        selectCount: 1,
      };
    case ADD_CART:
      const { newProduct } = action.payload;
      if(!newProduct){
        return {
          ...state,
          cart: [],
          selectSize: null,
          selectCount: 1,
        }
      }
      const index = state.cart.indexOf(state.cart.filter(item => item.id === newProduct.id).filter(item => item.size === newProduct.size)[0]);
      if (index === -1) {
        let cartLocal = JSON.stringify(state.cart.concat([newProduct]));        
        localStorage.setItem('cart', cartLocal);
        return {
          ...state,
          cart: state.cart.concat([newProduct]),
          selectSize: null,
          selectCount: 1,
        }
      } else {
        let newCart = state.cart.map(product => {
          if (product.id === newProduct.id && product.size === newProduct.size) {
            return {
              ...product,
              number: newProduct.number + product.number,
              selectSize: null,
              selectCount: 1,
            }
          }
          return {
            product,
            selectSize: null,
            selectCount: 1,
          };
        })
        let cartLocal = JSON.stringify(newCart);        
        localStorage.setItem('cart', cartLocal);
        return {
          ...state,
          cart: newCart,           
        }
      }
    case REMOVE_PROD:
      const { removeId } = action.payload;      
      let cartLocal = JSON.stringify(state.cart.filter(item => item.id !== removeId));        
      localStorage.setItem('cart', cartLocal);
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== removeId)
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
    case SET_PRODUCT_SIZE:
      const { size } = action.payload;
      return {
        ...state,
        selectSize: size,
      }
    case INCREMENT_COUNT:
      return {
        ...state,
        selectCount: state.selectCount < 10 ? state.selectCount + 1 : state.selectCount,
      }
    case DECREMENT_COUNT:
      return {
        ...state,
        selectCount: state.selectCount > 1 ? state.selectCount - 1 : state.selectCount,
      }

    default:
      return state;
  }
}


