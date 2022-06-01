exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("plans").del();
  await knex("plans").insert([
    {
      plan_id: 1,
      plan_title: "Weekend Hangout",
      plan_duration: 4,
      plan_location: "phoenix, az",
      plan_travel_time: "10",
      plan_upvotes: 30,
      plan_downvotes: 20,
      user_id: 1,
    },
    {
      plan_id: 2,
      plan_title: "Simple date",
      plan_duration: 1,
      plan_location: "phoenix, az",
      plan_travel_time: "10",
      plan_upvotes: 20,
      plan_downvotes: 40,
      user_id: 2,
    },
    {
      plan_id: 3,
      plan_title: "Fancy date",
      plan_duration: 4,
      plan_location: "phoenix, az",
      plan_travel_time: "10",
      plan_upvotes: 60,
      plan_downvotes: 10,
      user_id: 3,
    },
  ]);
};
