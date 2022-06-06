exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("destinations").del();
  await knex("destinations").insert([
    {
      destination_id: 1,
      destination_type: "restaurant",
      destination_name: "restaurant_location",
      plan_id: 1,
    },
    {
      destination_id: 2,
      destination_type: "movie",
      destination_name: "movie_theater_location",
      plan_id: 1,
    },
    {
      destination_id: 3,
      destination_type: "arcade",
      destination_name: "laserTag_location",
      plan_id: 1,
    },
    {
      destination_id: 4,
      destination_type: "cafe",
      destination_name: "boba_location",
      plan_id: 2,
    },
    {
      destination_id: 5,
      destination_type: "arcade",
      destination_name: "arcade_location",
      plan_id: 2,
    },
    {
      destination_id: 6,
      destination_type: "park",
      destination_name: "park_location",

      plan_id: 3,
    },
    {
      destination_id: 7,
      destination_type: "theater",
      destination_name: "theater_location",

      plan_id: 3,
    },
    {
      destination_id: 8,
      destination_type: "restaurant",
      destination_name: "restaurant_location",
      plan_id: 3,
    },
  ]);
};
