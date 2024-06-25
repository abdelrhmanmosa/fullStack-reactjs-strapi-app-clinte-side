import { createSlice } from "@reduxjs/toolkit";
import { addItemToShoppingCart } from "../../utils";
import { createStandaloneToast } from "@chakra-ui/react";
const  { toast } = createStandaloneToast();

const initialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts = addItemToShoppingCart(
        action.payload,
        state.cartProducts
      );
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload
      );
      toast({
        title: "Item Removed",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    clearCart: (state) => {
      state.cartProducts = [];
      toast({
        title: "Your Cart Is Empty Now",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectorCart = ({ cart }) => cart;
export default cartSlice.reducer;
