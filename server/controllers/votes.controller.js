const plansService = require("../models/plans.service");
const votesService = require("../models/votes.service");
const asyncErrorBoundary = require("../middleware/asyncErrorBoundary");

// VALIDATORS

const planExists = async (req, res, next) => {
  const { planId } = req.params;
  const plan = await plansService.getPlan(planId);

  if (plan) {
    res.locals.plan = plan;
    return next();
  }

  next({ status: 404, message: `Plan cannot be found.` });
};

// FUNCTIONS

const getVotesCount = async (req, res) => {
  const plan = res.locals.plan;
  const votesUp = await votesService.getVoteCount(plan.plan_id, {
    upvote: true,
    downvote: false,
  });
  const votesDown = await votesService.getVoteCount(plan.plan_id, {
    upvote: false,
    downvote: true,
  });
  const totalVotes = votesUp.count - votesDown.count;

  return res.json({
    data: {
      vote: {
        vote_count: totalVotes,
      },
    },
  });
};

const votePlan = async (req, res) => {
  const plan = res.locals.plan;

  const vote = await votesService.getVote(plan.plan_id, plan.user_id);
  let newVote = req.body.data;

  if (vote) {
    const updatedVote = {
      vote_id: vote.vote_id,
      vote_up: newVote.vote_up,
      vote_down: newVote.vote_down,
      user_id: plan.user_id,
      plan_id: plan.plan_id,
    };

    const updateVote = await votesService.updateVote(updatedVote);
    const planUpdated = await votesService.updateVoteCount(plan.plan_id);

    return res.json({
      data: {
        vote: {
          plan_id: updateVote[0].plan_id,
          vote_up: updateVote[0].vote_up,
          vote_down: updateVote[0].vote_down,
          user_id: updateVote[0].user_id,
          total_votes: planUpdated[0].plan_votes,
        },
      },
    });
  }
  newVote = {
    vote_up: newVote.vote_up,
    vote_down: newVote.vote_down,
    user_id: req.user.userId,
    plan_id: plan.plan_id,
  };

  const saved_vote = await votesService.createVote(newVote);
  await votesService.updateVoteCount(plan.plan_id);
  return res.json({
    data: {
      vote: {
        plan_id: saved_vote.plan_id,
        vote_up: saved_vote.vote_up,
        vote_down: saved_vote.vote_down,
        user_id: saved_vote.user_id,
      },
    },
  });

  res.status(404).json({ msg: "Action not allowed!" });
};

module.exports = {
  getVotesCount: [
    asyncErrorBoundary(planExists),
    asyncErrorBoundary(getVotesCount),
  ],
  votePlan: [asyncErrorBoundary(planExists), asyncErrorBoundary(votePlan)],
};
