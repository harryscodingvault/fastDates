import originFetch from "../../utils/axios";
import { logoutUser } from "./userSlice";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await originFetch.post(url, user);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await originFetch.post(url, user);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await originFetch.patch(url, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    return res.data;
  } catch (err) {
    if (err.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Action not allowed!");
    }
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};
