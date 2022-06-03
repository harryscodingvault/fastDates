import React, { useState } from "react";
import CardItemsList from "../../components/cardItemsList/CardItemsList";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";

import { handleChange } from "../../features/plans/planSlice";

import FormInput from "../../components/formInput/FormInput";

const Home = () => {
  const { user } = useSelector((store) => store.user);
  const { timeOptions, durationOptions, time, duration, location } =
    useSelector((store) => store.plan);
  const dispatch = useDispatch();

  const handlePlanInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="home-container">
      {user && (
        <button className="btn home-btn">
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
        <button className="btn" type="submit">
          Search
        </button>
      </form>
      <div className="home-list">
        <CardItemsList />
      </div>
    </div>
  );
};

export default Home;
