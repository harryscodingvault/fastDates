const env = process.env.NODE_ENV || "development";
const config = require("../knexfile")[env];
const knex = require("knex")(config);

const { attachPaginate } = require("knex-paginate");
attachPaginate();

module.exports = knex;
