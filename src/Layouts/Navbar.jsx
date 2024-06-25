import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
} from "@chakra-ui/react";
import { FiSun } from "react-icons/fi";
import { IoMoon } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for validation
import cookieServices from "../services/cookieServices";
import { useSelector, useDispatch } from "react-redux";
import { selectorCart } from "../app/features/CartSlice";
import { onOpenCartDrawerAction } from "../app/features/globalSlice";

const Links = ["Dashboard", "Products", "Team"];

function NavLink({ children }) {
  // Add children as a prop
  return (
    <Link
      as={RouterLink}
      to={children.toLowerCase()}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Link>
  );
}

// Add propTypes validation for NavLink component
NavLink.propTypes = {
  children: PropTypes.node.isRequired,
};

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector(selectorCart);
  const { colorMode, toggleColorMode } = useColorMode();
  const token = cookieServices.get("jwt");
  // *logoutHandler
  const logoutHandler = () => {
    cookieServices.remove("jwt");
    window.location.href = "/login";
  };
  // *onOpenCartDrawer
  const onOpenDrawer = () => {
    dispatch(onOpenCartDrawerAction());
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <RouterLink to={"/"}>My App</RouterLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoon /> : <FiSun />}
              </Button>
              <Button onClick={onOpenDrawer}>
                Cart ({cartProducts.length})
              </Button>
              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"../../assets/images/myPhoto.jpg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={"../../assets/images/myPhoto.jpg"}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>abdomosa</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button as={RouterLink} to={"/login"}>
                  Login
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
