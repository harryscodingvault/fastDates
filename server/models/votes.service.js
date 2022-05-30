const knex = require("../db/connection.js");

const getVote = (planId, userId) => {
  return knex("votes")
    .select("*")
    .where({ plan_id: planId, user_id: userId })
    .first();
};

const createVote = (vote) => {
  return knex("votes")
    .insert(vote, "*")
    .then((createdRecords) => createdRecords[0]);
};

const updateVote = (updatedVote) => {
  return knex("votes")
    .select("*")
    .where({ vote_id: updatedVote.vote_id })
    .update(updatedVote, "*");
};

module.exports = {
  getVote,
  updateVote,
  createVote,
};
