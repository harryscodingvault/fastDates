import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originFetch from "../../utils/axios";
import { createUser } from "../../data/data";

const initialState = {
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const result = await createUser({
        username: user.username,
        password: user.password,
        email: user.email,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    console.log("Login User: ", JSON.stringify(user));
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
});

export default userSlice.reducer;
