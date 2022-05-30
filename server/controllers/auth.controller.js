const authService = require("../models/auth.service");
const userService = require("../models/users.service");
const asyncErrorBoundary = require("../middleware/asyncErrorBoundary");
const hasProperties = require("../middleware/hasProperties");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// VALIDATORS

const userExist = async (req, res, next) => {
  const { email } = req.body.data;
  const user = await userService.getUser({ email });

  if (user) {
    res.locals.user = user;
    return next();
  } else {
    return next();
  }
};

// FUNCTIONS

const register = async (req, res) => {
  const { password, email, username } = req.body.data;
  const newUser = { password, email, username };

  if (!res.locals.user) {
    const user = await authService.register(newUser);
    return res.json({
      data: { user: { email: user.user_email, username: user.user_username } },
    });
  }
  res.status(404).json({ message: `Email already in use.` });
};

const login = async (req, res) => {
  const newUser = res.locals.user;
  const { password } = req.body.data;

  if (newUser) {
    const isMatch = await bcrypt.compareSync(password, newUser.user_password);

    if (!isMatch) {
      return res.status(404).json({ message: `Wrong password` });
    }
    const token = jwt.sign({ id: newUser.user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    return res.json({
      data: {
        token,
        user: {
          id: newUser.user_id,
          email: newUser.user_email,
          username: newUser.user_username,
        },
      },
    });
  }
  res.status(404).json({ message: `This account does not exist.` });
};

module.exports = {
  register: [
    asyncErrorBoundary(hasProperties("username", "email", "password")),
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(register),
  ],
  login: [
    asyncErrorBoundary(hasProperties("email", "password")),
    asyncErrorBoundary(userExist),
    asyncErrorBoundary(login),
  ],
};
