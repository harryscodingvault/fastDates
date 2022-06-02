import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originFetch from "../../utils/axios";
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  error_message: { origin: "", message: "" },
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const res = await originFetch.post("/auth/register", user);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const res = await originFetch.post("/auth/login", user);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const res = await originFetch.patch(
        `/users/${thunkAPI.getState().user.user.user.id}`,
        user,
        {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
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
