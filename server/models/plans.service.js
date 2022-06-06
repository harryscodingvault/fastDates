const knex = require("../db/connection.js");
const moment = require("moment");

const listPlans = ({ sLocation, fromT, sDuration, sPage, only, userId }) => {
  const currentTime = moment().format("YYYY-MM-DDTHH:mm:ssZ");

  if (sLocation !== "n") {
    if (only) {
      return knex("plans as p")
        .join("users as u", "p.user_id", "u.user_id")
        .select("*")
        .where({ plan_location: sLocation })
        .whereRaw(`p.user_id = ${userId}`)
        .whereBetween("plan_duration", [sDuration[0], sDuration[1]])
        .whereBetween("p.created_at", [
          fromT.toString(),
          currentTime.toString(),
        ])
        .orderBy("plan_votes", "desc")
        .paginate({ perPage: 10, currentPage: sPage });
    }

    return knex("plans as p")
      .join("users as u", "p.user_id", "u.user_id")
      .select("*")
      .where({ plan_location: sLocation })
      .whereBetween("plan_duration", [sDuration[0], sDuration[1]])
      .whereBetween("p.created_at", [fromT.toString(), currentTime.toString()])
      .orderBy("plan_votes", "desc")

      .paginate({ perPage: 10, currentPage: sPage });
  }
  if (only) {
    return knex("plans as p")
      .join("users as u", "p.user_id", "u.user_id")
      .select("*")
      .whereRaw(`p.user_id = ${userId}`)
      .orderBy("plan_votes", "desc")
      .paginate({ perPage: 10, currentPage: sPage });
  }

  return knex("plans as p")
    .join("users as u", "p.user_id", "u.user_id")
    .select("*")
    .orderBy("plan_votes", "desc")
    .paginate({ perPage: 10, currentPage: sPage });
};

const getPlan = (planId) => {
  return knex("plans").select("*").where({ plan_id: planId }).first();
};

const createPlan = ({ title, duration, location, address }, userId) => {
  return knex("plans")
    .insert(
      {
        user_id: userId,
        plan_title: title,
        plan_duration: duration,
        plan_location: location,
        plan_address: address,
        plan_votes: 0,
      },
      "*"
    )
    .then((createdRecords) => createdRecords[0]);
};

const editPlan = ({ title, location, duration, address }, planId) => {
  return knex("plans").select("*").where({ plan_id: planId }).update(
    {
      plan_title: title,
      plan_location: location,
      plan_duration: duration,
      plan_address: address,
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
