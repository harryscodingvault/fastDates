const knex = require("../db/connection.js");
const moment = require("moment");
const paginate = require("knex-paginate");

const listPlans = ({ sLocation, fromT, sDuration, sPage }) => {
  const currentTime = moment().format("YYYY/MM/DD");
  console.log({ currentTime, fromT });
  if (sLocation !== "n") {
    return (
      knex("plans")
        .select("*")
        .where({ plan_location: sLocation })
        .whereBetween("plan_duration", [sDuration[0], sDuration[1]])
        //.whereBetween("created_at", [fromT, currentTime])
        .orderBy("plan_upvotes", "asc")
        .paginate({ perPage: 20, currentPage: sPage })
    );
  }
  return knex("plans")
    .select("*")
    .orderBy("plan_upvotes", "asc")
    .paginate({ perPage: 20, currentPage: sPage });
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
