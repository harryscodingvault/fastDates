const knex = require("../db/connection.js");

const getDestinations = (planId) => {
  return knex("destinations").select("*").where({ plan_id: planId });
};

const createDestination = ({ type, name }, planId) => {
  return knex("destinations")
    .insert(
      {
        destination_type: type,
        destination_name: name,
        plan_id: planId,
      },
      "*"
    )
    .then((createdRecords) => createdRecords[0]);
};

const deleteDestinations = (planId) => {
  return knex("destinations").select({ plan_id: planId }).del();
};

module.exports = {
  getDestinations,
  createDestination,
  deleteDestinations,
};
