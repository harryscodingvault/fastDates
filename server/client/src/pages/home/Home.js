import React, { useRef, useEffect } from "react";
import CardItemsList from "../../components/cardItemsList/CardItemsList";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  handleChange,
  clearValues,
  getAllPlans,
  increasePage,
} from "../../features/plans/planSlice";

import FormInput from "../../components/formInput/FormInput";

const Home = () => {
  const { user } = useSelector((store) => store.user);
  const { plans } = useSelector((store) => store.plan);
  const {
    timeOptions,
    durationOptions,
    time,
    duration_1,
    duration_2,
    location,
    currentItemsQty,
  } = useSelector((store) => store.plan);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPlans());
  }, []);

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
        <div className="search-location">
          <div className="search-label">
            <h5>Search plan by</h5>
          </div>
          <FormInput
            type="location"
            name="location"
            values={location}
            handleChange={handlePlanInput}
            placeholder="City, State"
          />
        </div>
        <div className="home-select-group">
          <div className="form-row form-row-select time-select">
            <div className="select-label">
              <h5>Created this</h5>
            </div>
            <select
              className="form-select"
              name="time"
              id="time"
              value={time}
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
          <div className="duration-select-group">
            <div className="select-label">
              <h5>Hourly length from</h5>
            </div>
            <div className="form-row form-row-select">
              <select
                name="duration_1"
                id="duration_1"
                value={duration_1}
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
                value={duration_2}
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
        <CardItemsList plans={plans} />
      </div>
      {currentItemsQty === 20 && (
        <div
          className="btn more-plans-btn"
          onClick={() => {
            dispatch(increasePage());
            dispatch(getAllPlans());
          }}
        >
          <h5>More</h5>
        </div>
      )}
    </div>
  );
};

export default Home;
