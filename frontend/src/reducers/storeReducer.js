import {
  FETCH_TOP_REQUEST,
  FETCH_CATALOG_REQUEST,
  FETCH_TOP_FAILURE,
  FETCH_CATALOG_FAILURE,
  FETCH_CATEGORIES_FAILURE,
  FETCH_TOP_SUCCESS,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATALOG_MORE,
  CHANGE_CATEGORY,
  CHANGE_HEADER_SEARCH,
  CHANGE_FORM,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  PRODUCT_SIZE,
  INCREASE_NUMBER,
  LOWER_NUMBER,
  ADD_CART,
  REMOVE_PROD,
  I_AGREE,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_FAILURE,
  ERROR_NULL
} from '../actions/actionCreators';

const initialState = {
  topSales: [],
  categories: [{
    id: 16,
    title: 'Все'
  }],
  cart: [],
  product: {},
  category: 16,
  catalog: [],
  formValue: '',
  catalogValue: '',
  address: '',
  phone: '',
  selectSize: null,
  selectNumber: 1,
  loadingTopSales: false,
  loadingCatalog: false,
  loadingProduct: false,
  loadingOrder: false,
  btnLoadMore: true,
  headerSearch: true,
  isAgree: false,
  orderSuccess: false,
  error: null,
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_REQUEST:
      return {
        ...state,
        loadingTopSales: true,
        error: null,
      }
    case FETCH_CATALOG_REQUEST:
      return {
        ...state,
        loadingCatalog: true,
        error: null,
      }
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loadingProduct: true,
        error: null,
      }
    case FETCH_ORDER_REQUEST:
      return {
        ...state,
        loadingOrder: true,
        error: null,
      }
    case FETCH_TOP_FAILURE:
      const { errorTop } = action.payload;
      return {
        ...state,
        loadingTopSales: false,
        error: errorTop
      }
    case FETCH_CATALOG_FAILURE:
      const { errorCatalog } = action.payload;
      return {
        ...state,
        loadingCatalog: false,
        error: errorCatalog
      }
    case FETCH_PRODUCT_FAILURE:
      const { errorProduct } = action.payload;
      return {
        ...state,
        loadingProduct: false,
        error: errorProduct
      }
    case FETCH_CATEGORIES_FAILURE:
      const { errorCategories } = action.payload;
      return {
        ...state,
        error: errorCategories
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
    case FETCH_TOP_SUCCESS:
      const { topSales } = action.payload;
      return {
        ...state,
        topSales,
        loadingTopSales: false,
        error: null,
      };
    case FETCH_CATALOG_SUCCESS:
      const { catalog } = action.payload;
      return {
        ...state,
        catalog,
        loadingCatalog: false,
        error: null,
      };
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
    case FETCH_CATEGORIES_SUCCESS:
      const { categories } = action.payload;
      return {
        ...state,
        categories: [...state.categories].concat(categories),
        error: null,
      };
    case FETCH_CATALOG_MORE:
      const { catalogMore } = action.payload;
      let more = true;
      catalogMore.length < 6 ? more = false : more = true;
      return {
        ...state,
        catalog: [...state.catalog].concat(catalogMore),
        loadingCatalog: false,
        btnLoadMore: more,
        error: null,
      };
    case CHANGE_CATEGORY:
      const { category } = action.payload;
      return {
        ...state,
        catalogValue: '',
        category: category,
        btnLoadMore: true,
      }
    case CHANGE_HEADER_SEARCH:
      return {
        ...state,
        headerSearch: !state.headerSearch,
        catalogValue: state.catalogValue == '' ? state.formValue :
          (state.formValue == '' ? state.catalogValue : state.formValue),
        formValue: '',
      }
    case CHANGE_FORM:
      const { value, name } = action.payload;
      return {
        ...state,
        [name]: value,
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
     
    default:
      return state;
  }
}


