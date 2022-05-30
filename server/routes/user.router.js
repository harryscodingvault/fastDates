const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const authenticateUser = require("../middleware/auth");

router
  .route("/:userId")
  .get(getUser)
  .patch(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser);

//Routes

module.exports = router;
