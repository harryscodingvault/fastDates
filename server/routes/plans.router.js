const express = require("express");
const router = express.Router();
const {
  getPlan,
  getAllPlans,
  createPlan,
  editPlan,
  deletePlan,
} = require("../controllers/plans.controller");
const { votePlan, getVotesCount } = require("../controllers/votes.controller");
const authenticateUser = require("../middleware/auth");

router.route("/").get(getAllPlans).post(authenticateUser, createPlan);

router
  .route("/:planId")
  .get(getPlan)
  .patch(authenticateUser, editPlan)
  .delete(authenticateUser, deletePlan);
router
  .route("/:planId/vote")
  .get(getVotesCount)
  .post(authenticateUser, votePlan);

module.exports = router;
