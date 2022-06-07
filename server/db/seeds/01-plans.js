exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("plans").del();
  await knex("plans").insert([
    {
      plan_id: 1,
      plan_title: "Seed: Weekend Hangout",
      plan_duration: 4,
      plan_location: "phoenix, az",
      plan_address: "plan_address_1",

      plan_votes: 0,
      user_id: 1,
    },
    {
      plan_id: 2,
      plan_title: "Seed: Simple date",
      plan_duration: 1,
      plan_location: "phoenix, az",
      plan_address: "plan_address_2",

      plan_votes: 0,
      user_id: 2,
    },
    {
      plan_id: 3,
      plan_title: "Seed: Fancy date",
      plan_duration: 4,
      plan_location: "phoenix, az",
      plan_address: "plan_address_3",

      plan_votes: 0,
      user_id: 3,
    },
  ]);
};
