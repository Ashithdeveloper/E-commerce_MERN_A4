import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../ReduxSlices/productSlices";

export const store = configureStore({
    reducer:{
        product : productSlice ,
    }
})
