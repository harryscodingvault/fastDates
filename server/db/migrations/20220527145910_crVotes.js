exports.up = function (knex) {
  return knex.schema.createTable("votes", (table) => {
    table.increments("vote_id").primary();
    table.boolean("vote_up");
    table.boolean("vote_down");
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("cascade");
    table.integer("plan_id").unsigned().notNullable();
    table
      .foreign("plan_id")
      .references("plan_id")
      .inTable("plans")
      .onDelete("cascade");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("votes");
};
