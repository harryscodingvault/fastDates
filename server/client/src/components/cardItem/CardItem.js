import React from "react";
import "./CardItems.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSelector, useDispatch } from "react-redux";
import { deletePlan } from "../../features/plans/planSlice";

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
  const dispatch = useDispatch();

  const mapDestinations = destinations.map((destination) => (
    <li key={destination.destination_id}>
      <p>
        <span>{destination.destination_type}</span>
      </p>
      <h5>{destination.destination_name}</h5>
    </li>
  ));

  const deleteHandler = () => {
    dispatch(deletePlan(data.plan_id));
  };

  return (
    <div className="cardItem-container">
      <div className="cardItem-voting--btn-group">
        <div className="vote-btn">
          <ArrowUpwardIcon />
        </div>
        <h5>{plan_votes}</h5>
        <div className="vote-btn">
          <ArrowDownwardIcon />
        </div>
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

      {user.user.id === data.user_id && (
        <div className="cardItem-edit-btn-group">
          <button className="btn">Edit</button>
          <button className="btn" onClick={() => deleteHandler()}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CardItem;
