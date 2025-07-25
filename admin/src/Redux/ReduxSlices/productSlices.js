import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    editProduct: (state, action) => {
      state.items = [action.payload]; 
    },
  },
});

export const { editProduct } = productSlice.actions;
export default productSlice.reducer;