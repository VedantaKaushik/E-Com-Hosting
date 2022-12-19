import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  error: null,
  priceTotal: 0,
  totalQuantity: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      const itemIndex = state.product.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        state.product[itemIndex].quantity += 1;
      } else {
        const temp = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.product.push(temp);
      }

      // //
      let { total, Quant } = state.product.reduce(
        (cartTotal, product) => {
          const { price, cartQuantity } = product;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.Quant += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          Quant: 0,
        }
      );

      state.totalQuantity = Quant;
      let n = Number(total);
      state.priceTotal = n;
    },

    incQuantity: (state, action) => {
      const itemIndex = state.product.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        if (state.product[itemIndex].cartQuantity >= 10) {
          state.error = "Maximum Quantity Avalible You Can Order is 10";
        } else {
          state.product[itemIndex].cartQuantity += 1;
        }
      }
      return;
    },

    decQuantity: (state, action) => {
      const itemIndex = state.product.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex <= 1) {
        if (state.product[itemIndex].cartQuantity <= 1) {
          state.error = "Quantity Cannot Be Less Than 1";
        } else {
          state.product[itemIndex].cartQuantity -= 1;
        }
      }
      return;
    },

    getTotal: (state) => {
      let { total, quantity } = state.product.reduce(
        (cartTotal, product) => {
          const { price, cartQuantity } = product;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.totalQuantity = quantity;
      state.priceTotal = total.toFixed(2);
    },

    removeItem: (state, action) => {
      //
    },
  },
});
export default CartSlice.reducer;

export const { updateCart, deleteProduct, decQuantity, incQuantity, getTotal } =
  CartSlice.actions;
