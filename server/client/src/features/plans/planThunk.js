import originFetch from "../../utils/axios";

export const getAllPlansThunk = async (url, thunkAPI) => {
  try {
    const res = await originFetch.get(url);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const getUserPlansThunk = async (url, thunkAPI) => {
  try {
    const res = await originFetch.get(url);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const getPlanThunk = async (url, plan, thunkAPI) => {
  try {
    const res = await originFetch.get(url);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const createPlanThunk = async (url, plan, thunkAPI) => {
  try {
    const res = await originFetch.post(url, plan, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const editPlanThunk = async (url, plan, thunkAPI) => {
  try {
    const res = await originFetch.patch(url, plan, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const deletePlanThunk = async (url, thunkAPI) => {
  try {
    const res = await originFetch.delete(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};

export const votePlanThunk = async (url, vote, thunkAPI) => {
  try {
    const res = await originFetch.post(url, vote, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
};
