exports.up = function (knex) {
  return knex.schema.createTable("destinations", (table) => {
    table.increments("destination_id").primary();
    table.string("destination_type");
    table.string("destination_address");
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
  return knex.schema.dropTable("destinations");
};
