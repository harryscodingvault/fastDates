exports.up = function (knex) {
  return knex.schema.createTable("plans", (table) => {
    table.increments("plan_id").primary();
    table.string("plan_title");
    table.integer("plan_duration");
    table.string("plan_location");
    table.integer("plan_votes");
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("cascade");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("plans");
};
