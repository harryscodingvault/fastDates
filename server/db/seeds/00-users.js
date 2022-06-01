exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      user_id: 1,
      user_username: "Harry",
      user_password: "Harry@mail.com",
      user_email: "Harry@mail.com",
    },
    {
      user_id: 2,
      user_username: "Sam",
      user_password: "Sam@mail.com",
      user_email: "Sam@mail.com",
    },
    {
      user_id: 3,
      user_username: "Veronica",
      user_password: "Veronica@mail.com",
      user_email: "Veronica@mail.com",
    },
  ]);
};
