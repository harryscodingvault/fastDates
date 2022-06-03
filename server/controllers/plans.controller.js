const plansService = require("../models/plans.service");
const usersService = require("../models/users.service");
const destinationsService = require("../models/destinations.service");

const asyncErrorBoundary = require("../middleware/asyncErrorBoundary");
const moment = require("moment");

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

// UTILS

function getLastWeek() {
  return moment().subtract(7, "day").calendar();
}

function getLastMonth() {
  return moment().subtract(30, "day").calendar();
}

function getLastYear() {
  return moment().subtract(1, "year").calendar();
}

// FUNCTIONS

const getPlan = async (req, res) => {
  const plan = res.locals.plan;
  const destinations = await destinationsService.getDestinations(plan.plan_id);
  const user = await usersService.getUser({ userId: plan.user_id });
  res.json({
    data: {
      plan: {
        user: user.user_username,
        plan_id: plan.plan_id,
        title: plan.plan_title,
        location: plan.plan_location,
        duration: plan.plan_duration,
        travel_time: plan.plan_travel_time,
        votes: plan.plan_votes,
        destinations: destinations.map((destination) => {
          return {
            type: destination.destination_type,
            name: destination.destination_name,
            address: destination.destination_address,
          };
        }),
      },
    },
  });
};

const getAllPlans = async (req, res) => {
  const { location, duration, time, page } = req.query;

  const sPage = page;
  const sLocation = location?.split("-").join(", ") || "n";
  const sDuration = duration
    ? [parseInt(duration?.split("-")[0]), parseInt(duration?.split("-")[1])]
    : [0, 10];

  const sTime = {
    week: getLastWeek(),
    month: getLastMonth(),
    year: getLastYear(),
  };
  const fromT = moment(sTime[time] || sTime.year).format("YYYY/MM/DD");

  const data = await plansService.listPlans({
    sLocation,
    fromT,
    sDuration,
    sPage,
  });

  const formattedPlans = await Promise.all(
    data.data.map(async (plan) => {
      try {
        const destinations = await destinationsService.getDestinations(
          plan.plan_id
        );
        const newFormat = {
          plan_id: plan.plan_id,
          plan_title: plan.plan_title,
          plan_duration: plan.plan_duration,
          plan_location: plan.plan_location,
          plan_votes: plan.plan_votes,
          destinations: destinations,
        };
        return newFormat;
      } catch (err) {
        return "Wll, cant do it";
      }
    })
  );

  res.json({ data: { plans: formattedPlans, paginate: data.pagination } });
};

const createPlan = async (req, res) => {
  const { title, duration, location, travel_time, destinations } =
    req.body.data;
  const newPlan = { title, duration, location, travel_time };

  const user = req.user;

  const saved_plan = await plansService.createPlan(newPlan, user.userId);

  destinations.slice(0, 5).map(async (destination) => {
    await destinationsService.createDestination(
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
            name: destination.destination_name,
            address: destination.destination_address,
          };
        }),
      },
    },
  });
};

const editPlan = async (req, res) => {
  const plan = res.locals.plan;
  if (req.user.userId === plan.user_id) {
    const newPlan = req.body.data;
    const { title, location, duration, travel_time, destinations } = newPlan;

    const editedPlan = await plansService.editPlan(
      { title, location, duration, travel_time },
      plan.plan_id
    );

    await destinationsService.deleteDestinations(plan.plan_id);
    destinations.slice(0, 5).map(async (destination) => {
      return await destinationsService.createDestination(
        destination,
        plan.plan_id
      );
    });
    const plan_destinations = await destinationsService.getDestinations(
      plan.plan_id
    );

    return res.json({
      data: {
        plan: {
          plan_id: editedPlan[0].plan_id,
          title: editedPlan[0].plan_title,
          duration: editedPlan[0].plan_duration,
          location: editedPlan[0].plan_location,
          travel_time: editedPlan[0].plan_travel_time,
          destinations: plan_destinations.map((destination) => {
            return {
              type: destination.destination_type,
              address: destination.destination_address,
            };
          }),
        },
      },
    });
  }
  res.status(404).json({ msg: "Action not allowed!" });
};

const deletePlan = async (req, res) => {
  const plan = res.locals.plan;
  if (req.user.userId === plan.user_id) {
    await plansService.deletePlan(plan.plan_id);
    return res.send("Plan deleted!");
  }
  res.status(404).json({ msg: "Action not allowed!" });
};

module.exports = {
  getPlan: [asyncErrorBoundary(planExists), asyncErrorBoundary(getPlan)],
  getAllPlans: [asyncErrorBoundary(getAllPlans)],
  createPlan: [asyncErrorBoundary(createPlan)],
  editPlan: [asyncErrorBoundary(planExists), asyncErrorBoundary(editPlan)],
  deletePlan: [asyncErrorBoundary(planExists), asyncErrorBoundary(deletePlan)],
};
