exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("votes").del();
  await knex("votes").insert([
    { vote_id: 1, vote_up: true, vote_down: false, user_id: 1, plan_id: 1 },
    { vote_id: 2, vote_up: true, vote_down: false, user_id: 1, plan_id: 2 },
    { vote_id: 3, vote_up: true, vote_down: false, user_id: 1, plan_id: 3 },
    { vote_id: 4, vote_up: false, vote_down: true, user_id: 2, plan_id: 1 },
    { vote_id: 5, vote_up: false, vote_down: false, user_id: 2, plan_id: 2 },
    { vote_id: 6, vote_up: true, vote_down: false, user_id: 3, plan_id: 1 },
    { vote_id: 7, vote_up: false, vote_down: true, user_id: 3, plan_id: 2 },
    { vote_id: 8, vote_up: true, vote_down: false, user_id: 3, plan_id: 3 },
  ]);
};
