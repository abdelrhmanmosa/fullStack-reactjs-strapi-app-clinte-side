import { Grid } from "@chakra-ui/react";
import axios from "axios";
import ProductsCard from "../components/ProductsCard";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductSkeleton";

const ProductsPage = () => {
  const getProductList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products?populate=thumbnail,category`
    );
    return data;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductList(),
  });

  if (isLoading)
    return (
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
        margin={30}
      >
        {" "}
        {Array.from({ length: 20 }, (_, idx) => (
          <ProductSkeleton key={idx} />
        ))}
      </Grid>
    );
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gap={6}
      margin={30}
    >
      {data.data.map((product) => (
        <ProductsCard key={product.id} {...product} />
      ))}
    </Grid>
  );
};

export default ProductsPage;
