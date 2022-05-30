const plansService = require("../models/plans.service");
const destinationsService = require("../models/destinations.service");
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
  const { title, duration, location, travel_time, destinations } =
    req.body.data;
  const newPlan = { title, duration, location, travel_time };

  const user = req.user;

  const saved_plan = await plansService.createPlan(newPlan, user.userId);

  destinations.map(async (destination) => {
    return await destinationsService.createDestination(
      destination,
      saved_plan.plan_id
    );
  });
  const saved_destinations = await destinationsService.getDestinations(
    saved_plan.plan_id
  );

  return res.json({
    data: {
      plan: {
        plan_id: saved_plan.plan_id,
        title: saved_plan.plan_title,
        duration: saved_plan.plan_duration,
        location: saved_plan.plan_location,
        travel_time: saved_plan.plan_travel_time,
        destinations: saved_destinations.map((destination) => {
          return {
            type: destination.destination_type,
            address: destination.destination_address,
          };
        }),
      },
    },
  });
};

const editPlan = async (req, res) => {
  console.log("user", req.user);
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
  createPlan: [asyncErrorBoundary(createPlan)],
  editPlan,
  deletePlan,
  votePlan,
};
