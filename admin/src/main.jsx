import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from "react-redux";
import { store } from './Redux/ReduxStore/reduxStore.js'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer position="top-center" autoClose={1000} />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
