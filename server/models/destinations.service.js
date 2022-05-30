const knex = require("../db/connection.js");

const getDestinations = (planId) => {
  return knex("destinations").select("*").where({ plan_id: planId });
};

const createDestination = ({ type, address }, planId) => {
  return knex("destinations")
    .insert(
      {
        destination_type: type,
        destination_address: address,
        plan_id: planId,
      },
      "*"
    )
    .then((createdRecords) => createdRecords[0]);
};

const editDestination = (planId) => {
  return knex("destinations").select("*").where({ plan_id: planId }).first();
};

const deleteDestination = (planId) => {
  return knex("destinations").select("*");
};

module.exports = {
  getDestinations,
  createDestination,
  editDestination,
  deleteDestination,
};
