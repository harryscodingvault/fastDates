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

const updateVoteCount = async (planId) => {
  const upvoteCount = await knex("votes")
    .count()
    .where({ plan_id: planId, vote_up: true })
    .first();

  const downvoteCount = await knex("votes")
    .count()
    .where({ plan_id: planId, vote_down: true })
    .first();
  const totalVotes = upvoteCount.count - downvoteCount.count;
  return knex("plans")
    .select("*")
    .where({ plan_id: planId })
    .update({ plan_votes: totalVotes.count }, "*");
};

const getVoteCount = (planId, { upvote, downvote }) => {
  return knex("votes")
    .count()
    .where({ plan_id: planId, vote_up: upvote, vote_down: downvote })
    .first();
};

module.exports = {
  getVote,
  updateVote,
  createVote,
  getVoteCount,
  updateVoteCount,
};
