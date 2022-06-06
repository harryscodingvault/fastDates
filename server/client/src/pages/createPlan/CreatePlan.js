import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/formInput/FormInput";
import "./CreatePlan.css";
import { GoDiffAdded, GoDiffRemoved } from "react-icons/go";

import { createPlan } from "../../features/plans/planSlice";

const initialState = {
  title: "",
  duration: 1,
  location: "",
  address: "",
};

const CreatePlan = () => {
  const [values, setValues] = useState(initialState);
  const [destinations, setDestinations] = useState([{ name: "", type: "" }]);
  const { error_message, isLoading, currentPlan, durationOptions } =
    useSelector((store) => store.plan);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { title, duration, location, address } = values;

    const filteredD = destinations.filter((item) => {
      return (
        item.name !== "" &&
        item.type !== "" &&
        item.hasOwnProperty("name") &&
        item.hasOwnProperty("type") &&
        Object.keys(item).length !== 0
      );
    });

    if (
      filteredD.length >= 1 &&
      duration !== "" &&
      title !== "" &&
      location !== "" &&
      address !== ""
    ) {
      const plan = {
        title,
        location,
        duration,
        address,
        destinations: filteredD,
      };

      dispatch(createPlan({ data: plan }));
    }
    if (error_message.origin !== "createPlan") {
      navigate("/");
    }
  };

  const renderDestinationsInputs = destinations.map((destination, index) => {
    const arrayHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setDestinations((currentD) =>
        currentD.map((x, i) => {
          return i === index ? { ...x, [name]: value } : x;
        })
      );
    };

    return (
      <div className="destination-input-group" key={index}>
        <h5>Destination {index + 1}</h5>
        <FormInput
          type="text"
          name="name"
          value={destination.name}
          handleChange={(e) => arrayHandler(e)}
          placeholder="Destination Name"
        />
        <FormInput
          type="text"
          name="type"
          value={destination.type}
          handleChange={(e) => arrayHandler(e)}
          placeholder="Destination Type"
        />
      </div>
    );
  });

  return (
    <div className="create-plan-container">
      <form className="form" onSubmit={onSubmit}>
        <h3>Create Plan</h3>

        <FormInput
          type="text"
          name="title"
          value={values.title}
          handleChange={handleChange}
          placeholder="Title"
        />
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

        <FormInput
          type="text"
          name="location"
          value={values.location}
          handleChange={handleChange}
          placeholder="City, State"
        />
        <FormInput
          type="text"
          name="address"
          value={values.address}
          handleChange={handleChange}
          placeholder="Address Link"
        />
        <div className="create-plan-destinations-group">
          {renderDestinationsInputs}
        </div>

        <div className="destination-btn-group">
          {destinations.length >= 2 && (
            <div
              className="btn-destination"
              onClick={() => {
                setDestinations(
                  destinations.filter(
                    (item, index) => index < destinations.length - 1
                  )
                );
              }}
            >
              <GoDiffRemoved />
            </div>
          )}
          {destinations.length <= 9 && (
            <div
              className="btn-destination"
              onClick={() => setDestinations([...destinations, {}])}
            >
              <GoDiffAdded />
            </div>
          )}
        </div>
        {error_message.origin === "createPlan" && (
          <div className="alert alert-danger">{error_message.message}</div>
        )}

        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <div className="create-plan-btn-group">
            <button
              className="btn btn-block"
              type="button"
              onClick={() => navigate("/")}
            >
              <h5>Cancel</h5>
            </button>
            <button className="btn btn-block" type="submit">
              <h5>Submit</h5>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePlan;
