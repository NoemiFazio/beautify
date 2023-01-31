import { combineReducers, createStore } from "redux";

const initialState = {
  makeupData: {
    makeup: [],
    favourites: [],
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
};

function makeupReducer(state = {}, action) {
  switch (action.type) {
    case "SET_MAKEUP_LIST":
      return { ...state, makeup: action.payload };
    case "SET_FAVORITE_MAKEUP":
      return { ...state, favourites: [...state.favourites, action.payload] };
    case "REMOVE_FAVORITE_MAKEUP":
      return {
        ...state,
        favourites: state.favourites.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "RESTORE_FAVORITE":
      return { ...state, favourites: action.payload };
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
const rootReducer = combineReducers({
  makeupData: makeupReducer,
  navbarStatus: navbarStatusReducer,
  filterStatus: filterReducer,
});

const store = createStore(rootReducer, initialState);

export default store;
