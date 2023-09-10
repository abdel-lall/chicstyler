import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  productsPortion: [],
  filtteredProducts: [],
  productDetail: {},
  searchWord: "",
  errors: null,
};

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setProductsPortion: (state, action) => {
      state.productsPortion = action.payload;
    },

    setfiltteredProducts: (state, action) => {
      state.filtteredProducts = action.payload;
    },

    setProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    setSearchWord: (state, action) => {
      state.searchWord = action.payload;
    },

    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const {
  setAllProducts,
  setfiltteredProducts,
  setErrors,
  setProductDetail,
  setSearchWord,
  setProductsPortion,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
