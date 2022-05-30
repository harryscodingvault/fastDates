const knex = require("../db/connection.js");
const bcrypt = require("bcrypt");

const register = (user) => {
  const { username, email, password } = user;
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  return knex("users")
    .insert(
      {
        user_username: username,
        user_email: email,
        user_password: hashedPassword,
      },
      "*"
    )
    .then((createdRecords) => createdRecords[0]);
};

module.exports = {
  register,
};
