import React, { useRef } from "react";
import CardItemsList from "../../components/cardItemsList/CardItemsList";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  handleChange,
  clearValues,
  getAllPlans,
} from "../../features/plans/planSlice";

import FormInput from "../../components/formInput/FormInput";

const Home = () => {
  const { user } = useSelector((store) => store.user);
  const { timeOptions, durationOptions, time, duration, location } =
    useSelector((store) => store.plan);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(time, duration, location, "search");

  const handlePlanInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllPlans());
  };

  const cancelSearchHandler = () => {
    dispatch(clearValues());
    dispatch(getAllPlans());
  };

  return (
    <div className="home-container">
      {user && (
        <button
          className="btn home-btn"
          onClick={() => navigate("/createplan")}
        >
          <h5>New Plan?</h5>
        </button>
      )}
      <form className="home-search-form form" onSubmit={onSubmit}>
        <FormInput
          type="location"
          name="location"
          value={location}
          handleChange={handlePlanInput}
          placeholder="location"
        />

        <div className="home-select-group">
          <div className="form-row form-row-select">
            <select
              className="form-select"
              name="time"
              id="time"
              values={time}
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
              values={duration}
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
        <CardItemsList />
      </div>
    </div>
  );
};

export default Home;
