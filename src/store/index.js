import { combineReducers, createStore } from "redux";

const initialState = {
  makeupData: { makeup: [] },
  navbarStatus: {
    isActive: false,
    isInputActive: false,
  },
};

function makeupReducer(state = {}, action) {
  switch (action.type) {
    case "SET_MAKEUP_LIST":
      return { ...state, makeup: action.payload };
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

const rootReducer = combineReducers({
  makeupData: makeupReducer,
  navbarStatus: navbarStatusReducer,
});

const store = createStore(rootReducer, initialState);

export default store;
