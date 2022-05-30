const knex = require("../db/connection.js");

const listPlans = () => {
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

const editPlan = (planId) => {
  return knex("users")
    .select("*")
    .where({ user_id: user_id })
    .update({ user_email: user_email, user_username, user_username }, "*");
};

const deletePlan = (planId) => {
  return knex("users")
    .select("*")
    .where({ user_id: user_id })
    .update({ user_email: user_email, user_username, user_username }, "*");
};

module.exports = {
  listPlans,
  getPlan,
  createPlan,
  editPlan,
  deletePlan,
};
