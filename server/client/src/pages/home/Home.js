import React, { useState } from "react";
import CardItemsList from "../../components/cardItemsList/CardItemsList";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";

import { getAllPlans } from "../../features/plans/planSlice";

import FormInput from "../../components/formInput/FormInput";

const Home = () => {
  const [values, setValues] = useState({
    state: "",
    city: "",
    time: "",
    duration: null,
  });
  const { user } = useSelector((store) => store.user);
  const { timeOptions, durationOptions } = useSelector((store) => store.plan);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    console.log("values", values);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { state, city, time, duration } = values;

    console.log("values", values);
  };

  return (
    <div className="home-container">
      {user && (
        <button className="btn home-btn">
          <h5>New Plan?</h5>
        </button>
      )}
      <form className="home-search-form form" onSubmit={onSubmit}>
        <div className="home-input-group">
          <FormInput
            classname="home-input-city"
            type="city"
            name="city"
            values={values.city}
            handleChange={handleChange}
            placeholder="City"
          />
          <FormInput
            classname="home-input-state"
            type="state"
            name="state"
            values={values.state}
            handleChange={handleChange}
            placeholder="State"
          />
        </div>
        <div className="home-select-group">
          <div className="form-row form-row-select">
            <select
              className="form-select"
              name="time"
              id="time"
              values={values.time}
              onChange={handleChange}
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
              values={values.duration}
              onChange={handleChange}
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

      <CardItemsList />
    </div>
  );
};

export default Home;
