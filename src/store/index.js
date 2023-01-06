import { combineReducers, createStore } from "redux";

const initialState = {
  makeupData: { makeup: [] },
};

function makeupReducer(state = {}, action) {
  switch (action.type) {
    case "SET_MAKEUP_LIST":
      return { ...state, makeup: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  makeupData: makeupReducer,
});

const store = createStore(rootReducer, initialState);

export default store;
