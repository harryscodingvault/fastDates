import React, { useState, useEffect } from "react";
import "./CardItems.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePlan,
  setCurrentPlan,
  votePlan,
  updateVotingCount,
} from "../../features/plans/planSlice";
import { useNavigate } from "react-router-dom";

const CardItem = ({ data }) => {
  const { user, currentPlan } = useSelector((store) => store.user);
  const {
    user_username,
    plan_duration,
    plan_title,
    plan_votes,
    plan_location,
    destinations,
  } = data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);

  const mapDestinations = destinations?.map((destination) => (
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

  const editHandler = () => {
    dispatch(setCurrentPlan(data));
    navigate(`plan/${data.plan_id}/edit`);
  };

  const votingHandler = (type) => {
    if ((type === "upVote" && upVote) || (type === "downVote" && downVote)) {
      setUpVote(false);
      setDownVote(false);
    }
    if ((type === "upVote" && !upVote) || (type === "upVote" && downVote)) {
      setUpVote(true);
      setDownVote(false);
    }
    if ((type === "downVote" && !downVote) || (type === "downVote" && upVote)) {
      setUpVote(false);
      setDownVote(true);
    }

    const vote = {
      vote_up: upVote,
      vote_down: downVote,
    };
    console.log("vote", vote);

    dispatch(setCurrentPlan(data));
    dispatch(updateVotingCount(data));
    dispatch(votePlan({ data: vote }));
  };

  return (
    <div className="cardItem-container">
      <div className="cardItem-voting--btn-group">
        <div
          className={`vote-btn ${upVote && !downVote && "vote-on"}`}
          onClick={() => votingHandler("upVote")}
        >
          <ArrowUpwardIcon />
        </div>
        <h5>{plan_votes}</h5>
        <div
          className={`vote-btn  ${downVote && !upVote && "vote-on"}`}
          onClick={() => votingHandler("downVote")}
        >
          <ArrowDownwardIcon />
        </div>
      </div>
      <div className="cardItem-text-group">
        <p>Creator: {user_username}</p>
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

      {user?.user.id === data.user_id && (
        <div className="cardItem-edit-btn-group">
          <button className="btn" onClick={() => editHandler()}>
            Edit
          </button>
          <button className="btn" onClick={() => deleteHandler()}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CardItem;
