import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

export const addItemToShoppingCart = (cartItem = {}, shoppingCartItem = []) => {
  const existingCartItem = shoppingCartItem.find(
    (item) => item.id === cartItem.id
  );
  if (existingCartItem) {
    toast({
      title: "Added to your cart",
      description: "This item already exist, the quantity will be increased",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    return shoppingCartItem.map((item) =>
      item.id === cartItem.id
        ? { ...cartItem, quantity: item.quantity + 1 }
        : item
    );
  }
  toast({
    title: "Added to your cart",
    status: "success",
    duration: 2000,
    isClosable: true,
  });
  return [...shoppingCartItem, { ...cartItem, quantity: 1 }];
};
