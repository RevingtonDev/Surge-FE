import { configureStore, combineReducers } from "@reduxjs/toolkit";

const defaultState = {
  isAuthenticated: false,
  user: null,
  shouldUpdate: false,
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
      };
    case "UPDATE":
      return {
        ...state,
        shouldUpdate: action.payload.shouldUpdate,
      };
    default:
      return state;
  }
};

const authenticateUser = (obj) => {
  return {
    type: "SET_USER",
    payload: obj,
  };
};

const updateApp = (obj) => {
  return {
    type: "UPDATE",
    payload: obj,
  };
};

const rootReducer = combineReducers({ user });

export const store = configureStore({ reducer: rootReducer });
export { authenticateUser, updateApp };
