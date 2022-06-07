const knex = require("../db/connection.js");

const getDestination = ({ destination_id }) => {
  return knex("destinations").select("*").where({ destination_id });
};

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

const updateDestination = ({ type, name }, destination_id) => {
  return knex("destinations")
    .select("*")
    .where({ destination_id: destination_id })
    .update(
      {
        destination_type: type,
        destination_name: name,
      },
      "*"
    );
};

const deleteDestinations = (planId) => {
  return knex("destinations").select({ plan_id: planId }).del();
};

module.exports = {
  getDestination,
  getDestinations,
  createDestination,
  deleteDestinations,
  updateDestination,
};
