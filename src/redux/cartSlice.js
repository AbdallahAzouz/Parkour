import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subtotal: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          img: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(existingItem.price);
      }
      state.subtotal = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      console.log(state.totalQuantity);
      // console.log(state.cartItems);
      console.log(newItem);
    },
    increment: (state, action) => {
      const newCart = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: Number(item.totalPrice) + Number(item.price),
          };
        }
        return item;
      });
      state.cartItems = newCart;
      state.totalQuantity = state.totalQuantity + 1;
      state.subtotal = state.cartItems.reduce(
        (acc, curr) => acc + Number(curr.totalPrice),
        0
      );
    },
    decrement: (state, action) => {
      const newCart = state.cartItems.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
            totalPrice: Number(item.totalPrice) - Number(item.price),
          };
        }
        return item;
      });
      state.cartItems = newCart;

      state.totalQuantity = state.cartItems.reduce(
        (acc, curr) => acc + Number(curr.quantity),
        0
      );

      state.subtotal = state.cartItems.reduce(
        (acc, curr) => acc + Number(curr.totalPrice),
        0
      );
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.subtotal = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export const { increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;

// state.cartItems = state.cartItems.map((item) => ({
//   ...item,
//   quantity: item.quantity + 1,
//   totalPrice: Number(item.totalPrice) + Number(item.price),
// }));

// state.totalQuantity += 1;
// state.subtotal = state.cartItems.reduce(
//   (total, item) => total + Number(item.price) * Number(item.quantity),
//   0
// );
