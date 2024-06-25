/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  Image,
  Heading,
  Stack,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductPage from "./ProductPage";

const ProductsCard = ({ id, attributes }) => {
  // const { id } = product;
  const { colorMode } = useColorMode();
  console.log(attributes?.thumbnail);
  return (
    <Card p={5}>
      <CardBody>
        <Image
          src={attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url}
          alt="Green double couch with wooden legs"
          mx={"auto"}
          boxSize={"200"}
          borderRadius={"50%"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign="center" mb={"2"}>
            {attributes.title}
          </Heading>
          <Text textAlign={"center"} fontSize={"sm"} mb={"2"}>
            {attributes.description}
          </Text>
          <Text color="purple.600" fontSize="3xl" textAlign={"center"}>
            {`$${attributes.price}`}
          </Text>
        </Stack>
      </CardBody>
      <Button
        as={Link}
        to={`/product/${id}`}
        py={5}
        bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
        color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
        w={"full"}
        border={"none"}
        variant={"outline"}
        size={"xl"}
        mt={1}
        overflow={"hidden"}
        onClick={() => <ProductPage />}
        _hover={{
          bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
          color: colorMode === "light" ? "white" : "#9f7aea",
          border: "transparent",
        }}
      >
        Viw Details
      </Button>
    </Card>
  );
};

export default ProductsCard;
