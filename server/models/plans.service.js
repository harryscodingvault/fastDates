const knex = require("../db/connection.js");

const listPlans = ({ location }) => {
  if (location) {
    return knex("plans").select("*").where({ plan_location: location });
  }
  return knex("plans").select("*");
};

const getPlan = (planId) => {
  return knex("plans").select("*").where({ plan_id: planId }).first();
};

const createPlan = ({ title, duration, location, travel_time }, userId) => {
  return knex("plans")
    .insert(
      {
        user_id: userId,
        plan_title: title,
        plan_duration: duration,
        plan_location: location,
        plan_travel_time: travel_time,
      },
      "*"
    )
    .then((createdRecords) => createdRecords[0]);
};

const editPlan = ({ title, location, duration, travel_time }, planId) => {
  return knex("plans").select("*").where({ plan_id: planId }).update(
    {
      plan_title: title,
      plan_location: location,
      plan_duration: duration,
      plan_travel_time: travel_time,
    },
    "*"
  );
};

const deletePlan = (planId) => {
  return knex("plans").select("*").where({ plan_id: planId }).del();
};

module.exports = {
  listPlans,
  getPlan,
  createPlan,
  editPlan,
  deletePlan,
};
