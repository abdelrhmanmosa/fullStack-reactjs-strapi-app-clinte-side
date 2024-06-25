import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../app/features/CartSlice";
const CartDrawerItem = ({
  id,
  attributes: { thumbnail, title, price },
  quantity,
}) => {
  const dispatch = useDispatch();
  //* removeItemFormCart
  const removeItemFormCart = () => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      <Flex alignItems="center" p={4} gap={2}>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${
            thumbnail.data.attributes.url
          }`}
          alt={title}
          w={"80px"}
          h={"80px"}
          rounded="full"
          objectFit={"cover"}
          mr={5}
        />
        <Stack>
          <Flex alignItems="center" gap={"20px"}>
            <Box w="200px" my={2}>
              <Text py={1} fontSize={"sm"}>
                title: {title}
              </Text>
              <Text py={1} fontSize={"sm"}>
                Price: ${price}
              </Text>
              <Text py={1} fontSize={"sm"}>
                Quantity: {quantity}
              </Text>
            </Box>
            <Button
              variant="outline"
              colorScheme="red"
              size="md"
              w="fit-content"
              onClick={removeItemFormCart}
            >
              <RiDeleteBin6Line />
            </Button>
          </Flex>
        </Stack>
      </Flex>
      <Divider />
    </>
  );
};

export default CartDrawerItem;
