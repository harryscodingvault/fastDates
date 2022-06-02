const userService = require("../models/users.service");
const asyncErrorBoundary = require("../middleware/asyncErrorBoundary");
const hasProperties = require("../middleware/hasProperties");
const jwt = require("jsonwebtoken");

// VALIDATORS
const userExistAuth = async (req, res, next) => {
  const { userId } = req.params;
  const user = await userService.getUser({ userId });

  if (user.user_id === req.user.userId) {
    res.locals.user = user;
    return next();
  }
  res.status(404).json({ msg: "Action not allowed!" });
};

const userExist = async (req, res, next) => {
  const { userId } = req.params;
  const user = await userService.getUser({ userId });

  if (user) {
    res.locals.user = user;
    return next();
  }
  res.status(404).json({ msg: "User not found!" });
};

// FUNCTIONS
const getUser = async (req, res) => {
  console.log(req.user);
  const { user_email, user_username } = res.locals.user;
  return res.json({
    data: { user: { email: user_email, username: user_username } },
  });
};

const updateUser = async (req, res) => {
  const { email, username, password } = req.body.data;
  const { user_id } = res.locals.user;
  const updatedUser = {
    user_id: user_id,
    user_email: email,
    user_username: username,
    user_password: password,
  };
  const data = await userService.updateUser(updatedUser);
  const { user_email, user_username } = data[0];
  const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return res.json({
    data: { token, user: { email: user_email, username: user_username } },
  });
};

const deleteUser = async (req, res) => {
  const { user_id } = res.locals.user;
  await userService.deleteUser(user_id);
  return res.json({
    data: "User deleted",
  });
};

module.exports = {
  getUser: [asyncErrorBoundary(userExist), asyncErrorBoundary(getUser)],
  updateUser: [
    asyncErrorBoundary(hasProperties("email", "username")),
    asyncErrorBoundary(userExistAuth),
    asyncErrorBoundary(updateUser),
  ],
  deleteUser: [
    asyncErrorBoundary(userExistAuth),
    asyncErrorBoundary(deleteUser),
  ],
};
