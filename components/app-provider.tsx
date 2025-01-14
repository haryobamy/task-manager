"use client";
import { store, useAppSelector } from "@/lib/redux/store";
import React, { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";

const persistor = persistStore(store);
function AppToastContainer() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={7000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      closeButton={false}
      className="__toastify"
      theme="light"
    />
  );
}

function ThemeProvider() {
  const { isDarkMode } = useAppSelector((state) => state.global);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return <></>;
}

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppToastContainer />
        <ThemeProvider />
        {children}
      </PersistGate>
    </Provider>
  );
}
