import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="gray.600">
      <SkeletonCircle size="40" mx={"auto"} />
      <SkeletonText
        mt="8"
        noOfLines={1}
        spacing="4"
        skeletonHeight="2"
        w={40}
        mx={"auto"}
      />
      <SkeletonText
        mt="4"
        w={60}
        noOfLines={1}
        spacing="4"
        skeletonHeight="2"
        mx={"auto"}
      />
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="2"
        w={40}
        mx={"auto"}
      />
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="2"
        w={40}
        mx={"auto"}
      />
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="2"
        w={60}
        mx={"auto"}
      />
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="2"
        w="10%"
        mx={"auto"}
      />
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="10"
        w={60}
        mx={"auto"}
        borderRadius={"5"}
      />
    </Box>
  );
};

export default ProductSkeleton;
