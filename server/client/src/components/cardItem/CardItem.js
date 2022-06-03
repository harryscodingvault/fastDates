import React from "react";
import "./CardItems.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSelector } from "react-redux";

const CardItem = ({ data }) => {
  const { user } = useSelector((store) => store.user);
  const {
    user_id,
    plan_duration,
    plan_title,
    plan_votes,
    plan_location,
    destinations,
  } = data;

  const mapDestinations = destinations.map((destination) => (
    <li key={destination.destination_id}>
      <p>
        <span>{destination.destination_type}</span>
      </p>
      <h5>{destination.destination_name}</h5>
    </li>
  ));

  return (
    <div className="cardItem-container">
      <div className="cardItem-voting--btn-group">
        <button className="btn">
          <ArrowUpwardIcon />
        </button>
        <button className="btn">
          <ArrowDownwardIcon /> {plan_votes}
        </button>
      </div>
      <div className="cardItem-text-group">
        <p>Creator: {user_id}</p>
        <h4>{plan_title}</h4>
        <h5>
          Location: <span>{plan_location}</span>
        </h5>
        <h5>
          Duration: <span>{plan_duration}h</span>
        </h5>
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
