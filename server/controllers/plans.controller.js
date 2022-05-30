const plansService = require("../models/plans.service");
const asyncErrorBoundary = require("../middleware/asyncErrorBoundary");

// VALIDATORS

const planExists = async (req, res, next) => {
  const { planId } = req.params;
  const plan = await plansService.getPlan(planId);

  if (plan) {
    res.locals.plan = plan;
    return next();
  }

  next({ status: 404, message: `Plan cannot be found.` });
};

// FUNCTIONS

const getPlan = async (req, res) => {
  const data = res.locals.plan;
  res.json({ data });
};

const getAllPlans = async (req, res) => {
  const data = await plansService.listPlans();
  res.json({ data });
};

const createPlan = async (req, res) => {
  res.send("createPlan ");
};

const editPlan = async (req, res) => {
  res.send("editPlan");
};

const deletePlan = async (req, res) => {
  res.send("deletePlan ");
};

const votePlan = async (req, res) => {
  res.send("votePlan ");
};

module.exports = {
  getPlan: [asyncErrorBoundary(planExists), asyncErrorBoundary(getPlan)],
  getAllPlans,
  createPlan,
  editPlan,
  deletePlan,
  votePlan,
};
