import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const SkeletonProductPage = () => {
  return (
    <Box bg={"gray.700"} p={5} rounded={""}>
      <Skeleton height="200px" />
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        mx={"auto"}
        maxW={"200px"}
      />
      <SkeletonText mt="4" noOfLines={3} spacing="4" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" maxW={"120px"} />
      <Skeleton mt="4" height="50px" spacing="4" w={"full"} rounded={"lg"} />
    </Box>
  );
};

export default SkeletonProductPage;
