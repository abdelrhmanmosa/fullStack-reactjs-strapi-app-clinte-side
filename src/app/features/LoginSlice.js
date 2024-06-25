import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstant } from "./../../api/axios.config";
import { createStandaloneToast } from "@chakra-ui/react";
import CookieServices from "../../services/cookieServices";

const initialState = {
  loading: false,
  data: null,
  error: null,
};
const { toast } = createStandaloneToast();

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axiosInstant.post("/api/auth/local", user);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    //* case Pending
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        toast({
          title: "success user",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        const IN_DAYS = 3;
        const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
        const date = new Date();
        date.setTime(date.getTime() + EXPIRES_IN_DAYS);
        const option = { path: "/", expires: date };
        CookieServices.set("jwt", action.payload.jwt, option);
        window.location.href = "/";
      })
      .addCase(userLogin.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        toast({
          title: action.payload.response.data.error.message,
          description: "your email or password is not vaild",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  },
});

export const SelectLogin = ({ login }) => login;
export default LoginSlice.reducer;
