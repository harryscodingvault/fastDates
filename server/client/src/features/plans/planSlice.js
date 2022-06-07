import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import originFetch from "../../utils/axios";

import { getUserFromLocalStorage } from "../../utils/localStorage";

import {
  getAllPlansThunk,
  getPlanThunk,
  createPlanThunk,
  editPlanThunk,
  deletePlanThunk,
  votePlanThunk,
} from "./planThunk";

const initialState = {
  error_message: { origin: "", message: "" },
  success_message: { origin: "", message: "" },
  isLoading: false,
  user: getUserFromLocalStorage(),
  plans: [],
  user_plans: [],
  user_queries: {
    time: "year",
    duration_1: 0,
    duration_2: 10,
    location: "",
    currentPage: 1,
    currentItemsQty: null,
  },
  currentPlan: {},
  currentPage: 1,
  currentItemsQty: null,
  timeOptions: ["week", "month", "year"],
  time: "year",
  durationOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  duration_1: 0,
  duration_2: 10,
  location: "",
  address: "",

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
    const fLocation = thunkAPI
      .getState()
      .plan.location.toLowerCase()
      .split(/[, ]+/)
      .join("-");

    let queries = "";
    thunkAPI.getState().user?.user?.user.id
      ? (queries += `&user=${thunkAPI.getState().user.user.user.id}`)
      : (queries += "");
    thunkAPI.getState().plan.time
      ? (queries += `&time=${thunkAPI.getState().plan.time}`)
      : (queries += "");
    thunkAPI.getState().plan.duration_2 !== 0
      ? (queries += `&duration=${thunkAPI.getState().plan.duration_1}-${
          thunkAPI.getState().plan.duration_2
        }`)
      : (queries += "");
    thunkAPI.getState().plan.location
      ? (queries += `&location=${fLocation}`)
      : (queries += "");

    return getAllPlansThunk(
      `/plans?page=${thunkAPI.getState().plan.currentPage}${queries}`,
      thunkAPI
    );
  }
);

export const getUserPlans = createAsyncThunk(
  "plan/getUserPlans",
  async (_, thunkAPI) => {
    const fLocation = thunkAPI
      .getState()
      .plan.user_queries.location.toLowerCase()
      .split(/[, ]+/)
      .join("-");

    let queries = "";
    thunkAPI.getState().user?.user?.user.id
      ? (queries += `&user=${thunkAPI.getState().user.user.user.id}&only=true`)
      : (queries += "");
    thunkAPI.getState().plan.user_queries.time
      ? (queries += `&time=${thunkAPI.getState().plan.user_queries.time}`)
      : (queries += "");
    thunkAPI.getState().plan.user_queries.duration_2 !== 0
      ? (queries += `&duration=${
          thunkAPI.getState().plan.user_queries.duration_1
        }-${thunkAPI.getState().plan.user_queries.duration_2}`)
      : (queries += "");
    thunkAPI.getState().plan.user_queries.location
      ? (queries += `&location=${fLocation}`)
      : (queries += "");

    return getAllPlansThunk(
      `/plans?page=${
        thunkAPI.getState().plan.user_queries.currentPage
      }${queries}`,
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

export const votePlan = createAsyncThunk(
  "plan/deletePlan",
  async (vote, thunkAPI) => {
    return votePlanThunk(
      `/plans/${thunkAPI.getState().plan.currentPlan.plan_id}/vote`,
      vote,
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
    handleUserChange: (state, { payload: { name, value } }) => {
      state.user_queries[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
    refreshPlansList: (state) => {
      state.refresh_plans = false;
    },
    setCurrentPlan: (state, { payload }) => {
      state.currentPlan = payload;
    },
    searchPlan: (state, { payload }) => {
      state.time = payload.time;
      state.duration = payload.duration;
      state.location = payload.location;
    },
    increasePage: (state, { payload }) => {
      if (payload) {
        state.user_queries.currentPage =
          parseInt(state.user_queries.currentPage) + 1;
      }
      state.currentPage = parseInt(state.currentPage) + 1;
    },
  },
  extraReducers: {
    // GET ALL PLANS
    [getAllPlans.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPlans.fulfilled]: (state, { payload }) => {
      const { plans, paginate } = payload.data;
      if (state.plans.length > 0 && state.currentPage !== 1) {
        state.plans = [...state.plans, ...plans];
      } else {
        state.plans = plans;
      }

      state.currentPage = paginate.currentPage;
      state.currentItemsQty = paginate.to - paginate.from;
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
    // GET USER PLANS
    [getUserPlans.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserPlans.fulfilled]: (state, { payload }) => {
      const { plans, paginate } = payload.data;
      if (state.user_plans.length > 0 && state.user_queries.currentPage !== 1) {
        state.plans = [...state.user_plans, ...plans];
      } else {
        state.user_plans = plans;
      }
      state.user_queries.currentPage = paginate.currentPage;
      state.user_queries.currentItemsQty = paginate.to - paginate.from;
      state.isLoading = false;
      state.error_message = { origin: "", message: "" };
    },
    [getUserPlans.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error_message = {
        origin: "getUserPlans",
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
      state.isLoading = false;
      state.error_message = {
        origin: "editPlan",
        message: payload || "Cant edit plan :(",
      };
    },
    // VOTE PLAN
    [votePlan.pending]: (state) => {
      state.isLoading = true;
      state.success_message = {
        origin: "",
        message: "",
      };
    },
    [votePlan.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const total_votes = payload.data?.vote?.total_votes || 0;

      const updatedPlans = state.plans.map((plan) => {
        if (plan.plan_id === payload.data?.vote?.plan_id || 0) {
          return {
            ...plan,
            plan_votes: total_votes,
          };
        }
        return plan;
      });

      state.currentPlan.voteCount = total_votes;
      state.plans = updatedPlans;
      state.success_message = {
        origin: "votePlan",
        message: "Plan Updated!",
      };
      messageReset(state.success_message);
    },
    [votePlan.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error_message = {
        origin: "votePlan",
        message: payload || "Cant vote for plan :(",
      };
    },
  },
});

export const {
  handleUserChange,
  handleChange,
  clearValues,
  refreshPlansList,
  setCurrentPlan,
  increasePage,
} = planSlice.actions;
export default planSlice.reducer;
