import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import {
  onCloseCartDrawerAction,
  selectGlobal,
} from "../app/features/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import CartDrawerItem from "./CartDrawerItem";
import { selectorCart } from "../app/features/CartSlice";
import { clearCart } from "../app/features/CartSlice";

const CartDrawer = () => {
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectorCart);
  console.log(cartProducts);
  const dispatch = useDispatch();
  const btnRef = useRef();

  // *item
  const onClose = () => {
    dispatch(onCloseCartDrawerAction());
  };
  // *clearCart
  const clearAllCart = () => {
    dispatch(clearCart());
  };
  return (
    <>
      <Drawer
        isOpen={isOpenCartDrawer}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart</DrawerHeader>

          <DrawerBody>
            {cartProducts.length ? (
              cartProducts.map((item) => (
                <CartDrawerItem key={item.id} {...item} />
              ))
            ) : (
              <Text fontSize="18px">Your Cart Is Empty</Text>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme="red"
              mr={3}
              w="full"
              onClick={clearAllCart}
            >
              Clear All
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
