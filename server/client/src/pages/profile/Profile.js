import React, { useEffect } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleUserChange,
  clearValues,
  getUserPlans,
  increasePage,
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

  useEffect(() => {
    dispatch(getUserPlans(user));
  }, [dispatch, user]);

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
            {user.user.username}
          </h5>

          <h5>
            <span>Email:</span>
            {user.user.email}
          </h5>
        </div>
        <button className="btn" onClick={() => navigate("/profile/edit")}>
          Edit Profile
        </button>
      </div>
      <form className="home-search-form form" onSubmit={onSubmit}>
        <div className="home-block">
          <div className="search-location">
            <div className="search-label">
              <h5>Search plan by</h5>
            </div>
            <FormInput
              type="location"
              name="location"
              values={user_queries.location}
              handleChange={handlePlanInput}
              placeholder="City, State"
            />
          </div>

          <div className="form-row form-row-select time-select">
            <div className="select-label">
              <h5>Created this</h5>
            </div>
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
        </div>
        <div className="duration-select-group">
          <div className="select-label">
            <h5>Hourly length from</h5>
          </div>
          <div className="form-row form-row-select">
            <select
              name="duration_1"
              id="duration_1"
              value={user_queries.duration_1}
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
          <div className="select-label">
            <h5>To</h5>
          </div>
          <div className="form-row form-row-select">
            <select
              name="duration_2"
              id="duration_2"
              value={user_queries.duration_2}
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
            Reset
          </button>
          <button className="btn" type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="home-list">
        <CardItemsList plans={user_plans} />
      </div>
      {user_queries.currentItemsQty === 20 && (
        <div
          className="btn more-plans-btn"
          onClick={() => {
            dispatch(increasePage(user.user.id));
            dispatch(getUserPlans());
          }}
        >
          <h5>More</h5>
        </div>
      )}
    </div>
  );
};

export default Profile;
