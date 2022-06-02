export const travels = [
  {
    id: 1,
    creatorId: 1,
    creator: "Harry",
    duration: "3:30",
    title: "Weekend Hangout",
    location: "phoenix, az",
    destinations: [
      { type: "restaurant", name: "restaurant_location" },
      { type: "movie theater", name: "movie_theater_location" },
      { type: "arcade", name: "laserTag_location" },
    ],
    travel_time: "10",
    upvotes: 20,
    downvotes: 20,
  },
  {
    id: 2,
    creatorId: 1,
    creator: "Harry",
    duration: "1:00",
    title: "Simple date",
    location: "phoenix, az",
    destinations: [
      { type: "cafe", name: "boba_location" },
      { type: "arcade", name: "arcade_location" },
    ],
    travel_time: "10",
    upvotes: 30,
    downvotes: 10,
  },
  {
    id: 3,
    creatorId: 2,
    creator: "Sam",
    duration: "3:00",
    title: "Fancy date",
    location: "phoenix, az",
    destinations: [
      { type: "park", name: "park_location" },
      { type: "theater", name: "theater_location" },
      { type: "restaurant", name: "restaurant_location" },
    ],
    travel_time: "10",
    upvotes: 30,
    downvotes: 10,
  },
];

export const users = [
  {
    id: 1,
    username: "Harry",
  },
  {
    id: 2,
    username: "Sam",
  },
  {
    id: 3,
    username: "Amellie",
  },
];
