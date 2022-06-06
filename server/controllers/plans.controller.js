const plansService = require("../models/plans.service");
const usersService = require("../models/users.service");
const destinationsService = require("../models/destinations.service");
const votesService = require("../models/votes.service");

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
  const week = moment().subtract(7, "day").calendar();

  return moment(week).format("YYYY-MM-DDTHH:mm:ssZ");
}

function getLastMonth() {
  const month = moment().subtract(30, "day").calendar();

  return moment(month).format("YYYY-MM-DDTHH:mm:ssZ");
}

function getLastYear() {
  const year = moment().subtract(1, "year").calendar();

  return moment(year).format("YYYY-MM-DDTHH:mm:ssZ");
}

// FUNCTIONS

const getPlan = async (req, res) => {
  const plan = res.locals.plan;
  const destinations = await destinationsService.getDestinations(plan.plan_id);
  const user = await usersService.getUser({ userId: plan.user_id });
  res.json({
    data: {
      plan: {
        user_id: user.user_id,
        user: user.user_username,
        plan_id: plan.plan_id,
        title: plan.plan_title,
        location: plan.plan_location,
        duration: plan.plan_duration,
        address: plan.plan_address,
        votes: plan.plan_votes,
        destinations: destinations.map((destination) => {
          return {
            type: destination.destination_type,
            name: destination.destination_name,
          };
        }),
      },
    },
  });
};

const getAllPlans = async (req, res) => {
  const { location, duration, time, page, user: userId, only } = req.query;

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
  const fromT = sTime[time] || sTime.year;

  const data = await plansService.listPlans({
    sLocation,
    fromT,
    sDuration,
    sPage,
    only,
    userId,
  });

  const formattedPlans = await Promise.all(
    data.data.map(async (plan) => {
      try {
        let user_vote = { vote_up: null, vote_down: null };
        try {
          const vote = await votesService.getVote(plan.plan_id, userId);
          user_vote = vote;
        } catch (err) {}

        const destinations = await destinationsService.getDestinations(
          plan.plan_id
        );

        const newFormat = {
          user_username: plan.user_username,
          user_id: plan.user_id,
          plan_id: plan.plan_id,
          plan_title: plan.plan_title,
          plan_duration: plan.plan_duration,
          plan_location: plan.plan_location,
          plan_address: plan.plan_address,
          plan_votes: plan.plan_votes,
          user_vote: user_vote || null,
          destinations: destinations,
        };

        return newFormat;
      } catch (err) {
        return {};
      }
    })
  );

  res.json({ data: { plans: formattedPlans, paginate: data.pagination } });
};

const createPlan = async (req, res) => {
  const { title, duration, location, destinations, address } = req.body.data;
  const newPlan = { title, duration, location, address };

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
        address: saved_plan.plan_address,
        destinations: saved_destinations.map((destination) => {
          return {
            type: destination.destination_type,
            name: destination.destination_name,
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
    const { title, location, duration, destinations, address } = newPlan;

    const editedPlan = await plansService.editPlan(
      { title, location, duration, address },
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
          address: editedPlan[0].plan_address,
          destinations: plan_destinations.map((destination) => {
            return {
              type: destination.destination_type,
              name: destination.destination_name,
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
