import React from "react";
import "./CardItems.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSelector } from "react-redux";

const CardItem = ({ data }) => {
  const { user } = useSelector((store) => store.user);
  const {
    creator,
    duration,
    title,
    location,
    destinations,
    travel_time,
    upvotes,
    downvotes,
  } = data;

  const mapDestinations = destinations.map((item) => (
    <li key={item.name}>
      <p>
        <span>{item.type}</span>
      </p>
      <h5>{item.name}</h5>
    </li>
  ));

  return (
    <div className="cardItem-container">
      <div className="cardItem-text-group">
        <p>Creator: {creator}</p>
        <h4>{title}</h4>
        <h5>
          Location: <span>{location}</span>
        </h5>
        <h5>
          Duration: <span>{duration}h</span>
        </h5>
        <h5>
          Avg Travel: <span>{travel_time}min</span>
        </h5>
      </div>

      <div className="cardItem-voting--btn-group">
        <button className="btn">
          <ArrowUpwardIcon /> {upvotes}
        </button>
        <button className="btn">
          <ArrowDownwardIcon /> {downvotes}
        </button>
      </div>
      <div className="cardItem-destinations-container">
        <ul className="cardItem-destinations-list">{mapDestinations}</ul>
      </div>
      {user && (
        <div className="cardItem-edit-btn-group">
          <button className="btn">Edit</button>
          <button className="btn">Delete</button>
        </div>
      )}
    </div>
  );
};

export default CardItem;
