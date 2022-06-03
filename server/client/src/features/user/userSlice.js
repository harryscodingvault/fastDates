import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originFetch from "../../utils/axios";
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
} from "./userThunk";

const initialState = {
  error_message: { origin: "", message: "" },
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk(
      `/users/${thunkAPI.getState().user.user.user.id}`,
      user,
      thunkAPI
    );
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: {
    // REGISTER USER
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.error_message = { origin: "", message: "" };
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error_message = {
        origin: "registerUser",
        message: payload || "Fill all fields",
      };
    },
    // LOGIN USER
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { data } = payload;
      state.user = data;
      addUserToLocalStorage(data);
      state.isLoading = false;
      state.error_message = "";
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error_message = {
        origin: "loginUser",
        message: payload || "Fill all fields",
      };
    },
    // UPDATE USER
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
      state.isLoading = false;
      state.error_message = "";
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error_message = {
        origin: "updateUser",
        message: payload || "Fill all fields",
      };
    },
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
