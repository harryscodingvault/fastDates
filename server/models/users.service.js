const knex = require("../db/connection.js");
const bcrypt = require("bcrypt");

const getUser = ({ email, userId }) => {
  if (email) {
    return knex("users").select("*").where({ user_email: email }).first();
  }
  return knex("users").select("*").where({ user_id: userId }).first();
};

const updateUser = ({ user_id, user_email, user_username, user_password }) => {
  const hashedPassword = bcrypt.hashSync(user_password, bcrypt.genSaltSync(10));
  return knex("users")
    .select("*")
    .where({ user_id })
    .update({ user_email, user_username, user_password: hashedPassword }, "*");
};

const deleteUser = (user_id) => {
  return knex("users").select("*").where({ user_id: user_id }).del();
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
