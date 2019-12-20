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
  RESET_ERROR
} from '../actions/actionCreators';

const initialState = {
  topSales: [],
  categories: [{
    id: 16,
    title: 'Все'
  }],
  category: 16,
  catalog: [],
  formValue: '',
  catalogValue: '',
  loadingTopSales: false,
  loadingCatalog: false,
  btnLoadMore: true,
  headerSearch: true,
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
    case FETCH_CATEGORIES_FAILURE:
      const { errorCategories } = action.payload;
      return {
        ...state,
        error: errorCategories
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
    case FETCH_CATEGORIES_SUCCESS:
      const { categories } = action.payload;
      return {
        ...state,
        categories: [...state.categories, ...categories],
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

    if(state.headerSearch){
      return {
        ...state,
        headerSearch: !state.headerSearch
      }
    }else{
      if (state.catalogValue === '') {
        return {
          ...state,
          catalogValue: state.formValue,
          formValue: '',
          headerSearch: !state.headerSearch
        }
      } else if (state.formValue === '') {
        return {
          ...state,
          catalogValue: state.catalogValue,
          formValue: '',
          headerSearch: !state.headerSearch
        }
      } else {
        return {
          ...state,
          catalogValue: state.state.formValue,
          formValue: '',
          headerSearch: !state.headerSearch
        }
      }
    }


    case CHANGE_FORM:
      const { value, name } = action.payload;
      return {
        ...state,
        [name]: value,
      }
    case RESET_ERROR:
      return {
        ...state,
        orderSuccess: false,
        error: null,
      }

    default:
      return state;
  }
}


