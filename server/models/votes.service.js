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

const voteCount = (planId, { upvote, downvote }) => {
  return knex("votes")
    .count()
    .where({ plan_id: planId, vote_up: upvote, vote_down: downvote })
    .first();
};

module.exports = {
  getVote,
  updateVote,
  createVote,
  voteCount,
};
