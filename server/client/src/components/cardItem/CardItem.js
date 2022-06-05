import React, { useState, useEffect } from "react";
import "./CardItems.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePlan,
  setCurrentPlan,
  votePlan,
} from "../../features/plans/planSlice";
import { useNavigate } from "react-router-dom";

const CardItem = ({ data }) => {
  const { user } = useSelector((store) => store.user);
  const {
    user_username,
    plan_duration,
    plan_title,
    plan_votes,
    plan_location,
    destinations,
    user_vote,
  } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const [voteClicked, setVoteClicked] = useState(false);

  useEffect(() => {
    const vote = {
      vote_up: upVote,
      vote_down: downVote,
    };
    if (vote && data.plan_id !== undefined && voteClicked) {
      setVoteClicked(false);
      dispatch(setCurrentPlan(data));
      dispatch(votePlan({ data: vote }));
    }
  }, [upVote, downVote, voteClicked]);

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

  return (
    <div className="cardItem-container">
      <div className="cardItem-voting--btn-group">
        <div
          className={`vote-btn ${(user_vote?.vote_up || upVote) && "vote-on"}`}
          onClick={() => {
            setVoteClicked(true);
            setDownVote(false);
            setUpVote(!upVote);
          }}
        >
          <ArrowUpwardIcon />
        </div>
        <h5>{plan_votes ? plan_votes : 0}</h5>
        <div
          className={`vote-btn  ${
            (downVote || user_vote?.vote_down) && "vote-on"
          }`}
          onClick={() => {
            setVoteClicked(true);
            setDownVote(!downVote);
            setUpVote(false);
          }}
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
