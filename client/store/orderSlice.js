import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bagItems: [],
  bagCount: 0,
  subtotal: 0,
  total: 0,
  estimatedTax: 0,
  estimatedShipping: {
    Standard: 0,
    Premium: 0,
    Express: 0,
  },
};

const OredersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addItemtoOrder: (state, action) => {
      const { id, quantity, size, price } = action.payload;
      const existingProductIndex = state.bagItems.findIndex(
        (item) => item.id === id && item.size === size
      );

      if (existingProductIndex !== -1) {
        const updatedItem = state.bagItems[existingProductIndex];
        updatedItem.quantity += quantity;
      } else {
        state.bagItems.push(action.payload);
      }
      const subtotal = state.subtotal + price * quantity;
      state.subtotal = Math.round(subtotal * 100) / 100;
      const estimatedTax = (subtotal * 10) / 100;
      state.estimatedTax = Math.round(estimatedTax * 100) / 100;
      const shippingStandard =
        state.estimatedShipping.Standard + 6.49 + quantity * 1.49;
      const shippingPremium =
        state.estimatedShipping.Premium + 9.49 + quantity * 2.49;
      const shippingExpress =
        state.estimatedShipping.Express + 14.49 + quantity * 3.49;
      state.estimatedShipping = {
        Standard: Math.round(shippingStandard * 100) / 100,
        Premium: Math.round(shippingPremium * 100) / 100,
        Express: Math.round(shippingExpress * 100) / 100,
      };
      const total = subtotal + estimatedTax + shippingStandard;
      state.total = Math.round(total * 100) / 100;
      state.bagCount = state.bagCount + quantity;
    },
    removeItemFromOrder: (state, action) => {
      const { id, quantity, size, price } = action.payload;
      const bagItems = state.bagItems.filter(
        (item) => !(item.id === id && item.size === size)
      );
      state.bagItems = bagItems;
      const subtotal = state.subtotal - price * quantity;
      state.subtotal = Math.round(subtotal * 100) / 100;
      const estimatedTax = (subtotal * 10) / 100;
      state.estimatedTax = Math.round(estimatedTax * 100) / 100;
      const shippingStandard =
        state.estimatedShipping.Standard - (6.49 + quantity * 1.49);
      const shippingPremium =
        state.estimatedShipping.Premium - (9.49 + quantity * 2.49);
      const shippingExpress =
        state.estimatedShipping.Express - (14.49 + quantity * 3.49);
      state.estimatedShipping = {
        Standard: Math.round(shippingStandard * 100) / 100 || 0,
        Premium: Math.round(shippingPremium * 100) / 100 || 0,
        Express: Math.round(shippingExpress * 100) / 100 || 0,
      };
      const total = subtotal + estimatedTax + shippingStandard;
      state.total = Math.round(total * 100) / 100;
      state.bagCount = state.bagCount - quantity;
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity, size, price } = action.payload;
      const existingProductIndex = state.bagItems.findIndex(
        (item) => item.id === id && item.size === size
      );
      if (existingProductIndex !== -1) {
        const quantityDifference =
          quantity - state.bagItems[existingProductIndex].quantity;
        state.bagItems[existingProductIndex].quantity = quantity;

        const subtotal = state.subtotal + quantityDifference * price;
        state.subtotal = Math.round(subtotal * 100) / 100;
        const estimatedTax = (subtotal * 10) / 100;
        state.estimatedTax = Math.round(estimatedTax * 100) / 100;
        const shippingStandard =
          state.estimatedShipping.Standard + quantityDifference * 1.49;
        const shippingPremium =
          state.estimatedShipping.Premium + quantityDifference * 2.49;
        const shippingExpress =
          state.estimatedShipping.Express + quantityDifference * 3.49;
        state.estimatedShipping = {
          Standard: Math.round(shippingStandard * 100) / 100,
          Premium: Math.round(shippingPremium * 100) / 100,
          Express: Math.round(shippingExpress * 100) / 100,
        };
        const total = subtotal + estimatedTax + shippingStandard;
        state.total = Math.round(total * 100) / 100;
        state.bagCount = state.bagCount + quantityDifference;
      }
    },
  },
});

export const { addItemtoOrder, removeItemFromOrder, updateItemQuantity } =
  OredersSlice.actions;

export default OredersSlice.reducer;
