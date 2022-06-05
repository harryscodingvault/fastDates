import React, { useEffect } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleUserChange,
  clearValues,
  getUserPlans,
} from "../../features/plans/planSlice";

import CardItemsList from "../../components/cardItemsList/CardItemsList";
import FormInput from "../../components/formInput/FormInput";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const { user_plans } = useSelector((store) => store.plan);
  const navigate = useNavigate();

  const { timeOptions, durationOptions, user_queries } = useSelector(
    (store) => store.plan
  );
  const dispatch = useDispatch();

  const handlePlanInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleUserChange({ name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getUserPlans());
  };

  const cancelSearchHandler = () => {
    dispatch(clearValues());
    dispatch(getUserPlans());
  };

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-text-group">
          <h5>
            <span>Username:</span>
          </h5>
          <h5>{user.user.username}</h5>
        </div>
        <div className="profile-text-group">
          <h5>
            <span>Email:</span>
          </h5>
          <h5>{user.user.email}</h5>
        </div>
        <button className="btn" onClick={() => navigate("/profile/edit")}>
          Edit Profile
        </button>
      </div>
      <form className="home-search-form form" onSubmit={onSubmit}>
        <FormInput
          type="location"
          name="location"
          values={user_queries.location}
          handleChange={handlePlanInput}
          placeholder="location"
        />

        <div className="home-select-group">
          <div className="form-row form-row-select">
            <select
              className="form-select"
              name="time"
              id="time"
              value={user_queries.time}
              onChange={handlePlanInput}
            >
              {timeOptions.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-row form-row-select">
            <select
              name="duration"
              id="duration"
              value={user_queries.duration}
              onChange={handlePlanInput}
              className="form-select"
            >
              {durationOptions.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="home-search-btn-group">
          <button
            className="btn"
            type="button"
            onClick={() => cancelSearchHandler()}
          >
            Cancel
          </button>
          <button className="btn" type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="home-list">
        <CardItemsList plans={user_plans} />
      </div>
    </div>
  );
};

export default Profile;
