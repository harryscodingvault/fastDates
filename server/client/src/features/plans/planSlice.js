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
  success_message: { origin: "", message: "" },
  isLoading: false,
  user: getUserFromLocalStorage(),
  plans: [],
  currentPlan: {},
  currentPage: 1,
  timeOptions: ["week", "month", "year"],
  time: "",
  durationOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  duration: 0,
  location: "",
  refresh_plans: false,
};

const messageReset = (alert) => {
  alert.origin = "";
  alert.message = "";
  return setTimeout(2000);
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

export const createPlan = createAsyncThunk(
  "plan/createPlan",
  async (plan, thunkAPI) => {
    return createPlanThunk(`/plans/`, plan, thunkAPI);
  }
);

export const editPlan = createAsyncThunk(
  "plan/editPlan",
  async (plan, thunkAPI) => {
    return editPlanThunk(
      `/plans/${thunkAPI.getState().plan.currentPlan.plan_id}`,
      plan,
      thunkAPI
    );
  }
);

export const deletePlan = createAsyncThunk(
  "plan/deletePlan",
  async (plan_id, thunkAPI) => {
    return deletePlanThunk(`/plans/${plan_id}`, thunkAPI);
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
    refreshPlansList: (state) => {
      state.refresh_plans = false;
    },
    setCurrentPlan: (state, plan) => {
      state.currentPlan = plan.payload;
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
    // CREATE PLAN
    [createPlan.pending]: (state) => {
      state.isLoading = true;
    },
    [createPlan.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error_message = "";
      const { plan } = payload.data;
      state.currentPlan = plan;
    },
    [createPlan.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error_message = {
        origin: "createPlan",
        message: payload || "Cant create plan :(",
      };
    },
    // DELETE PLAN
    [deletePlan.pending]: (state) => {
      state.isLoading = true;
      state.success_message = {
        origin: "",
        message: "",
      };
    },
    [deletePlan.fulfilled]: (state) => {
      state.isLoading = false;

      state.success_message = {
        origin: "deletePlan",
        message: "Plan deleted!",
      };
      state.refresh_plans = true;
      messageReset(state.success_message);
    },
    [deletePlan.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error_message = {
        origin: "deletePlan",
        message: payload || "Cant delete plan :(",
      };
    },
    // EDIT PLAN
    [editPlan.pending]: (state) => {
      state.isLoading = true;
      state.success_message = {
        origin: "",
        message: "",
      };
    },
    [editPlan.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const { plan } = payload.data;
      state.currentPlan = plan;
      state.success_message = {
        origin: "editPlan",
        message: "Plan Updated!",
      };
      state.refresh_plans = true;
      messageReset(state.success_message);
    },
    [editPlan.rejected]: (state, { payload }) => {
      console.log("update failed");
      state.isLoading = false;
      state.error_message = {
        origin: "editPlan",
        message: payload || "Cant edit plan :(",
      };
    },
  },
});

export const { handleChange, clearValues, refreshPlansList, setCurrentPlan } =
  planSlice.actions;
export default planSlice.reducer;
