import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Flex,
} from "@chakra-ui/react";

import TableSkeleton from "./TableSkeleton";
import {
  useAddDashboardProductMutation,
  useDeleteDashboardProductMutation,
  useGetDashboardProductsQuery,
  useGetProductQuery,
  useUpdateDashboardProductMutation,
} from "../../app/services/apiSlice";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import CustomAlertDialog from "../../shared/AlertDialog";
import ProductPage from "../../components/ProductPage";
import { useEffect, useState } from "react";
import CustomModal from "../../shared/Modal";
import { IoIosAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectNetwork } from "../../app/features/networkSlice";

const TableProductsDashboard = () => {
  const { isOnline } = useSelector(selectNetwork);
  console.log(isOnline);
  const [clickedProductId, setClickedProductId] = useState(null);
  const [clickedProductToEdit, setClickedProductToEdit] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [thumbnail, setThumbnail] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClickedProductToEdit({
      ...clickedProductToEdit,
      [name]: value,
    });
  };

  const handlerPriceInputChange = (value) => {
    setClickedProductToEdit({
      ...clickedProductToEdit,
      price: +value,
    });
  };

  const handlerStockInputChange = (value) => {
    setClickedProductToEdit({
      ...clickedProductToEdit,
      stock: +value,
    });
  };

  const onThumbnailChangeHandler = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const onSubmitHandler = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: clickedProductToEdit.title,
        description: clickedProductToEdit.description,
        price: clickedProductToEdit.price,
        stock: clickedProductToEdit.stock,
      })
    );
    if (thumbnail) {
      formData.append("files.thumbnail", thumbnail);
    }
    updateProduct({
      id: clickedProductId,
      body: formData,
    });
  };

  // ** NewProducts
  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };
  const handleNewPriceInputChange = (value) => {
    setNewProduct({
      ...newProduct,
      price: +value,
    });
  };
  const handleNewStockInputChange = (value) => {
    setNewProduct({
      ...newProduct,
      stock: +value,
    });
  };
  const onNewSubmitHandler = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        stock: newProduct.stock,
      })
    );
    if (thumbnail) {
      formData.append("files.thumbnail", thumbnail);
    }
    addProduct({
      body: formData,
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  //* API update
  const [updateProduct, { isLoading: isUpdate, isSuccess: isUpdateSuccess }] =
    useUpdateDashboardProductMutation();

  //* API delete
  const [deleteProduct, { isLoading: isDelete, isSuccess }] =
    useDeleteDashboardProductMutation();

  //* API create
  const [addProduct, { isLoading: isAddLoading, isSuccess: isAddSuccess }] =
    useAddDashboardProductMutation();

  useEffect(() => {
    if (isSuccess) {
      setClickedProductId(null);
      onClose();
    }
    if (isUpdateSuccess) {
      setClickedProductId(null);
      onModalClose();
    }
    if (isAddSuccess) {
      setNewProduct({
        title: "",
        description: "",
        price: "",
        stock: 0,
      });
      setThumbnail(null);
      onCreateModalClose();
    }
  }, [isSuccess, isUpdateSuccess, isAddSuccess]);

  const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 });
  if (isLoading || !isOnline) return <TableSkeleton />;
  return (
    <>
      <Flex direction={"column"} my={"40px"} maxW={"85%"} mx={"auto"}>
        <Button
          colorScheme="blue"
          variant="solid"
          w={"fit-content"}
          ml={"auto"}
          onClick={onCreateModalOpen}
        >
          Create Nwe Product <IoIosAdd />
        </Button>
        <TableContainer
          border={"1px solid #2d3748"}
          my={6}
          rounded={"lg"}
          p={3}
        >
          <Table variant="simple">
            <TableCaption>
              Total Entries: {data?.data?.length ?? 0}
            </TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>TITLE</Th>
                <Th>CATEGORY</Th>
                <Th>THUMBNAIL</Th>
                <Th isNumeric>PRICE</Th>
                <Th isNumeric>STOCK</Th>
                <Th>ACTION</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data?.map((product) => (
                <Tr key={product?.id}>
                  <Td>{product?.id}</Td>
                  <Td>{product?.attributes?.title}</Td>
                  <Td>
                    {product?.attributes?.category?.data[0]?.attributes?.title}
                  </Td>
                  <Td>
                    <Image
                      borderRadius="full"
                      objectFit={"cover"}
                      boxSize="40px"
                      src={
                        product.attributes?.thumbnail?.data?.attributes?.formats
                          ?.thumbnail?.url
                      }
                      alt={product?.attributes?.title}
                    />
                  </Td>
                  <Td isNumeric>{product?.attributes?.price}</Td>
                  <Td isNumeric>{product?.attributes?.stock}</Td>
                  <Td>
                    <Button
                      as={Link}
                      to={`/product/${product.id}`}
                      colorScheme="purple"
                      variant="solid"
                      mr={3}
                      onClick={() => <ProductPage />}
                    >
                      <AiOutlineEye size={17} />
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="solid"
                      mr={3}
                      onClick={() => {
                        setClickedProductId(product?.id);
                        onOpen();
                      }}
                    >
                      <BsTrash size={17} />
                    </Button>
                    <Button
                      colorScheme="blue"
                      variant="solid"
                      onClick={() => {
                        setClickedProductId(product.id);
                        setClickedProductToEdit(product.attributes);
                        onModalOpen();
                      }}
                    >
                      <FiEdit size={17} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>ID</Th>
                <Th>TITLE</Th>
                <Th>CATEGORY</Th>
                <Th>THUMBNAIL</Th>
                <Th isNumeric>PRICE</Th>
                <Th isNumeric>STOCK</Th>
                <Th>ACTION</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>

      <CustomAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={"Are You Sure?"}
        description={
          "do you really want to destroy this product? this product can not undone"
        }
        cancelTxt={"Cancel"}
        okTxt={"Delete"}
        okDeleteHandler={() => {
          deleteProduct(clickedProductId);
        }}
        isLoading={isDelete}
      />

      <CustomModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        title="Update Product?"
        onOkClick={onSubmitHandler}
        isLoading={isUpdate}
        okTxt="Update"
        cancelTxt="Cancel"
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            value={clickedProductToEdit?.title}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            h={"108px"}
            name="description"
            value={clickedProductToEdit?.description}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            defaultValue={clickedProductToEdit?.price}
            onChange={handlerPriceInputChange}
            precision={2}
            step={0.2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Count in stock</FormLabel>
          <NumberInput
            step={1}
            min={1}
            name="stock"
            defaultValue={clickedProductToEdit?.stock}
            onChange={handlerStockInputChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            id="thumbnail"
            type="file"
            py={2}
            h={"full"}
            accept="image/png, image/gif, image/jpeg"
            onChange={onThumbnailChangeHandler}
          />
        </FormControl>
      </CustomModal>

      <CustomModal
        isOpen={isCreateModalOpen}
        onClose={onCreateModalClose}
        title="Create Product?"
        okTxt="Create"
        cancelTxt="Cancel"
        isLoading={isAddLoading}
        onOkClick={onNewSubmitHandler}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            placeholder="Your Title"
            value={newProduct?.title}
            onChange={handleNewInputChange}
          />
        </FormControl>
        <FormControl mt={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            h={"108px"}
            name="description"
            placeholder="Your Description"
            value={newProduct?.description}
            onChange={handleNewInputChange}
          />
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            precision={2}
            step={0.2}
            defaultValue={newProduct?.price}
            onChange={handleNewPriceInputChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Count in stock</FormLabel>
          <NumberInput
            step={1}
            min={1}
            name="stock"
            defaultValue={newProduct?.stock}
            onChange={handleNewStockInputChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            id="thumbnail"
            type="file"
            py={2}
            h={"full"}
            accept="image/png, image/gif, image/jpeg"
            onChange={onThumbnailChangeHandler}
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default TableProductsDashboard;
