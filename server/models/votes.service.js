const knex = require("../db/connection.js");

const votePlan = () => {
  return knex("plans").select("*");
};

module.exports = {
  votePlan,
};
