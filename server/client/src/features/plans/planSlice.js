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
  plans: {},
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
  async (user, thunkAPI) => {
    const queries = "";
    thunkAPI.getState().time
      ? (queries += `&time=${thunkAPI.getState().time}`)
      : (queries += "");
    thunkAPI.getState().duration
      ? (queries += `&duration=${thunkAPI.getState().duration}`)
      : (queries += "");
    thunkAPI.getState().location
      ? (queries += `&location=${thunkAPI.getState().location}`)
      : (queries += "");

    return getAllPlansThunk(
      `/plans?page=${thunkAPI.getState().currentPage}${queries}`,
      user,
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
  extraReducers: {
    // GET ALL PLANS
    [getAllPlans.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPlans.fulfilled]: (state, { payload }) => {
      const { plans } = payload;
      console.log("currentpLnas", plans);
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
      const { data } = payload;
      state.plan = data;
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

export default planSlice.reducer;
