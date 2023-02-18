import { combineReducers, createStore } from "redux";

const initialState = {
  makeupData: {
    makeup: [],
    favourites: [],
    viewed: [],
  },
  navbarStatus: {
    isActive: false,
    isInputActive: false,
  },
  filterStatus: {
    isFilterActive: false,
    isCategoryClicked: false,
    labels: [],
    // categoryValue: "",
    // brandValue: "",
    // brandKey: "",
    // categoryKey: "",
  },
  cartData: {
    cartList: [],
    purchasedList: [],
    purchaseModalVisibility: false,
  },
  userData: {
    isLogged: false,
    loginModalVisibility: false,
  },
};

function userReducer(state = {}, action) {
  switch (action.type) {
    case "SET_LOGIN":
      return { ...state, isLogged: true };
    case "SET_LOGOUT":
      return { ...state, isLogged: false };
    case "SET_LOGIN_MODAL_ON":
      return { ...state, loginModalVisibility: true };
    case "SET_LOGIN_MODAL_OFF":
      return { ...state, loginModalVisibility: false };

    default:
      return state;
  }
}

function makeupReducer(state = {}, action) {
  switch (action.type) {
    case "SET_MAKEUP_LIST":
      return { ...state, makeup: action.payload };
    case "SET_FAVORITE_MAKEUP":
      return { ...state, favourites: [...state.favourites, action.payload] };
    case "SET_VIEWED_PRODUCT":
      return { ...state, viewed: [...state.viewed, action.payload] };
    case "REMOVE_FAVORITE_MAKEUP":
      return {
        ...state,
        favourites: state.favourites.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "RESTORE_FAVORITE":
      return { ...state, favourites: action.payload };
    case "CLEAR_FAVOURITES":
      state.favourites = [];
      localStorage.clear();
    default:
      return state;
  }
}

function navbarStatusReducer(state = {}, action) {
  switch (action.type) {
    case "OPEN_MENU":
      return { isActive: true };
    case "CLOSE_MENU":
      return { isActive: false };
    case "INPUT_ACTIVE":
      return { isInputActive: true };
    case "INPUT_INACTIVE":
      return { isInputActive: false };
    default:
      return state;
  }
}

function filterReducer(state = {}, action) {
  switch (action.type) {
    case "OPEN_FILTER_MENU":
      return { ...state, isFilterActive: true };
    case "CLOSE_FILTER_MENU":
      return { ...state, isFilterActive: false };
    case "OPEN_CATEGORY_LIST":
      return { ...state, isCategoryClicked: true };
    case "CLOSE_CATEGORY_LIST":
      return { ...state, isCategoryClicked: false };
    case "SET_LABELS_LIST":
      return {
        // ...state,
        labels: action.payload,
      };
    // case "SET_CATEGORY_VALUE":
    //   return { categoryValue: action.payload };
    // case "SET_BRAND_VALUE":
    //   return { brandValue: action.payload };
    default:
      return state;
  }
}

function cartDataReducer(state = {}, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      state.cartList = [...state.cartList, action.payload];
      localStorage.setItem("cart", JSON.stringify(state.cartList));
      return { ...state, cartList: state.cartList };
    case "REMOVE_PRODUCT":
      state.cartList = state.cartList.filter((_, id) => id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartList));
    case "CLEAR_CART":
      state.cartList = [];
      localStorage.clear();
    case "SET_PURCHASE_MODAL_ON":
      return { ...state, purchaseModalVisibility: true };
    case "SET_PURCHASE_MODAL_OFF":
      return { ...state, purchaseModalVisibility: false };
      return {
        ...state,
        cartList: state.cartList,
      };
    // case "SET_UUID":
    //   return { ...state, Uuid: action.payload };
    case "BUY_ITEMS":
      return { ...state, purchasedList: state.cartList };
    case "CLEAR_PRODUCT":
      return { ...state, cartList: [] };
    case "RESTORE_CART":
      return { ...state, cartList: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  makeupData: makeupReducer,
  navbarStatus: navbarStatusReducer,
  filterStatus: filterReducer,
  cartData: cartDataReducer,
  userData: userReducer,
});

const store = createStore(rootReducer, initialState);

export default store;
