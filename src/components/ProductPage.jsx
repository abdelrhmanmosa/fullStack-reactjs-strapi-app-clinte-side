import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import SkeletonProductPage from "./SkeletonProductPage";
import { addToCart } from "../app/features/CartSlice";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const getProduct = async (id) => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${id}?populate=thumbnail&fields=title&fields=description&fields=price`
    );
    return data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const goBack = () => navigate(-1);

  const addToCartHandler = () => {
    dispatch(addToCart(data.data));
  };
  
  useEffect(() => {
    if (data) {
      document.title = `Product ${data.data?.attributes?.title} Page`;
    }
  }, [data]);

  if (isLoading)
    return (
      <Box maxW={"sm"} mx={"auto"} my={20}>
        <SkeletonProductPage />
      </Box>
    );
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <>
      <Flex
        alignItems={"center"}
        maxW="lg"
        mx={"auto"}
        my={7}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <BsArrowLeft />
        <Text ml={2}>Go Back</Text>
      </Flex>
      <Card p={5} w={"lg"} mx={"auto"}>
        <CardBody>
          <Image
            src={`${import.meta.env.VITE_SERVER_URL}${
              data?.data?.attributes?.thumbnail?.data?.attributes?.url
            }`}
            alt="Product Image"
            mx={"auto"}
            w={"400px"}
            h={"300px"}
            borderRadius={"sm"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign="center" mb={"2"}>
              {data?.data?.attributes?.title}
            </Heading>
            <Text textAlign={"center"} fontSize={"sm"} mb={"2"}>
              {data?.data?.attributes?.description}
            </Text>
            <Text color="purple.600" fontSize="3xl" textAlign={"center"}>
              {`$${data?.data?.attributes?.price}`}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={addToCartHandler}
            >
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductPage;
