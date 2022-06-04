const knex = require("../db/connection.js");
const moment = require("moment");

const listPlans = ({ sLocation, fromT, sDuration, sPage }) => {
  const currentTime = moment().format("YYYY/MM/DD");
  console.log({ currentTime, fromT });
  if (sLocation !== "n") {
    return (
      knex("plans")
        .join("users as u", "p.user_id", "u.user_id")
        .select("*")
        .where({ plan_location: sLocation })
        .whereBetween("plan_duration", [sDuration[0], sDuration[1]])
        //.whereBetween("created_at", [fromT, currentTime])
        .orderBy("plan_votes", "asc")
        .groupBy("p.plan_id")
        .paginate({ perPage: 10, currentPage: sPage })
    );
  }
  return knex("plans as p")
    .join("users as u", "p.user_id", "u.user_id")
    .select("*")
    .orderBy("plan_votes", "asc")
    .paginate({ perPage: 10, currentPage: sPage });
};

const getPlan = (planId) => {
  return knex("plans").select("*").where({ plan_id: planId }).first();
};

const createPlan = ({ title, duration, location }, userId) => {
  return knex("plans")
    .insert(
      {
        user_id: userId,
        plan_title: title,
        plan_duration: duration,
        plan_location: location,
      },
      "*"
    )
    .then((createdRecords) => createdRecords[0]);
};

const editPlan = ({ title, location, duration }, planId) => {
  return knex("plans").select("*").where({ plan_id: planId }).update(
    {
      plan_title: title,
      plan_location: location,
      plan_duration: duration,
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
