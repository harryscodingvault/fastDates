const knex = require("../db/connection.js");

const listPlans = () => {
  return knex("plans").select("*");
};

const getPlan = (planId) => {
  return knex("plans").select("*").where({ plan_id: planId }).first();
};

const createPlan = () => {
  return knex("plans").select("*");
};

module.exports = {
  listPlans,
  getPlan,
};
