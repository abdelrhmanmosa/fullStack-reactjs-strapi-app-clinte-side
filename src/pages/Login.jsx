import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { SelectLogin, userLogin } from "../app/features/LoginSlice";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function LoginPage({ isAuthenticated }) {
  const { loading } = useSelector(SelectLogin);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // استدعاء useColorModeValue بشكل غير مشروط
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const formBgColor = useColorModeValue("white", "gray.700");

  if (isAuthenticated) return <Navigate to={"/"} replace />;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!user.identifier && !user.password) {
      setIsEmail(true);
      setIsPassword(true);
      return;
    }
    if (!user.identifier) {
      setIsEmail(true);
      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }
    setIsEmail(false);
    setIsPassword(false);
    dispatch(userLogin(user));
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={bgColor}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          as={"form"}
          onSubmit={SubmitHandler}
          rounded={"lg"}
          bg={formBgColor}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="identifier">
              <FormLabel>Email address</FormLabel>
              <Input
                isInvalid={isEmail}
                errorBorderColor="crimson"
                type="email"
                name={"identifier"}
                value={user.identifier}
                onChange={onChangeHandler}
              />
              {isEmail && (
                <FormHelperText color={"red.500"}>
                  Email is required
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  isInvalid={isPassword}
                  errorBorderColor="crimson"
                  type={showPassword ? "text" : "password"}
                  name={"password"}
                  value={user.password}
                  onChange={onChangeHandler}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword && (
                <FormHelperText color={"red.500"}>
                  Password is required
                </FormHelperText>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                type="submit"
                bg={isEmail || isPassword ? "red.500" : "blue.500"}
                color={"white"}
                _hover={{
                  bg: isEmail || isPassword ? "red.600" : "blue.600",
                }}
                isLoading={loading}
                // onClick={loginHandler}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
