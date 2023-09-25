import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const renderRedux = (component, initialState = {}, reducer = {}, renderOptions = {}) => {
  const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    ...renderOptions,
    store,
    userEvent,
  };
};

export * from "@testing-library/react";
export * from "@testing-library/user-event";
export * from "jest-preview";
// override render method
export { renderRedux as render };
