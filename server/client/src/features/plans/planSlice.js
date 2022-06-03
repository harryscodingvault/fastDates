import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originFetch from "../../utils/axios";

import { getUserFromLocalStorage } from "../../utils/localStorage";

import {
  getAllPlansThunk,
  getPlanThunk,
  createPlanThunk,
  editPlanThunk,
  deletePlanThunk,
} from "./planThunk";

const initialState = {
  error_message: { origin: "", message: "" },
  isLoading: false,
  user: getUserFromLocalStorage(),
  plans: [],
  currentPlan: {},
  currentPage: 0,
  timeOptions: ["week", "month", "year"],
  time: "",
  durationOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  duration: 0,
  location: "",
};

export const getAllPlans = createAsyncThunk(
  "plan/getAllPlans",
  async (_, thunkAPI) => {
    let queries = "";
    thunkAPI.getState().plan.time
      ? (queries += `&time=${thunkAPI.getState().plan.time}`)
      : (queries += "");

    thunkAPI.getState().plan.duration !== 0
      ? (queries += `&duration=${thunkAPI.getState().plan.duration}`)
      : (queries += "");

    thunkAPI.getState().plan.location
      ? (queries += `&location=${thunkAPI.getState().plan.location}`)
      : (queries += "");

    return getAllPlansThunk(
      `/plans?page=${thunkAPI.getState().plan.currentPage}${queries}`,
      thunkAPI
    );
  }
);

export const getPlan = createAsyncThunk(
  "plan/getPlan",
  async (user, thunkAPI) => {
    return getPlanThunk("/auth/login", user, thunkAPI);
  }
);

export const editPlan = createAsyncThunk(
  "plan/editPlan",
  async (user, thunkAPI) => {
    return editPlanThunk(
      `/users/${thunkAPI.getState().user.user.user.id}`,
      user,
      thunkAPI
    );
  }
);

export const createPlan = createAsyncThunk(
  "plan/createPlan",
  async (user, thunkAPI) => {
    return createPlanThunk(
      `/users/${thunkAPI.getState().user.user.user.id}`,
      user,
      thunkAPI
    );
  }
);

export const deletePlan = createAsyncThunk(
  "plan/deletePlan",
  async (user, thunkAPI) => {
    return deletePlanThunk(
      `/users/${thunkAPI.getState().user.user.user.id}`,
      user,
      thunkAPI
    );
  }
);

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
  },
  extraReducers: {
    // GET ALL PLANS
    [getAllPlans.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPlans.fulfilled]: (state, { payload }) => {
      const { plans, paginate } = payload.data;
      state.plans = plans;
      state.currentPage = paginate.currentPage;
      state.isLoading = false;
      state.error_message = { origin: "", message: "" };
    },
    [getAllPlans.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error_message = {
        origin: "getAllPlans",
        message: payload || "Cant get plans :(",
      };
    },
    // GET CURRENT PLAN
    [getPlan.pending]: (state) => {
      state.isLoading = true;
    },
    [getPlan.fulfilled]: (state, { payload }) => {
      const { data } = payload.data;
      state.currentPlan = data;
      state.isLoading = false;
      state.error_message = "";
    },
    [getPlan.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error_message = {
        origin: "getPlan",
        message: payload || "Cant get plan :(",
      };
    },
  },
});

export const { handleChange, clearValues } = planSlice.actions;
export default planSlice.reducer;
