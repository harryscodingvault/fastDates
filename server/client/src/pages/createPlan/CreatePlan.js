import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/formInput/FormInput";
import "./CreatePlan.css";

import { createPlan } from "../../features/plans/planSlice";

const initialState = {
  title: "",
  duration: "",
  location: "",
};

const CreatePlan = () => {
  const [values, setValues] = useState(initialState);
  const [destinations, setDestinations] = useState([{ name: "", address: "" }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { title, duration, location } = values;

    const filteredD = destinations.filter((item) => {
      return (
        item.address !== "" &&
        item.name !== "" &&
        item.hasOwnProperty("address") &&
        item.hasOwnProperty("name") &&
        Object.keys(item).length !== 0
      );
    });
    console.log("filteredD", filteredD);
    if (
      filteredD.length >= 1 &&
      duration !== "" &&
      title !== "" &&
      location !== ""
    ) {
      const plan = { title, location, duration, destinations: filteredD };
      //dispatch(createPlan(plan));
      //console.log("plan", plan);
      //navigate("/");
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
          name="address"
          value={destination.address}
          handleChange={(e) => arrayHandler(e)}
          placeholder="Destination Address"
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
        <FormInput
          type="number"
          name="duration"
          value={values.duration}
          handleChange={handleChange}
          placeholder="Duration"
        />

        <FormInput
          type="text"
          name="location"
          value={values.location}
          handleChange={handleChange}
          placeholder="Location"
        />
        <div className="create-plan-destinations-group">
          {renderDestinationsInputs}
        </div>

        {destinations.length !== 5 && (
          <div
            className="btn-add"
            onClick={() => setDestinations([...destinations, {}])}
          >
            <h2>+</h2>
          </div>
        )}

        <button className="btn btn-block" type="submit">
          <h5>Submit</h5>
        </button>
      </form>
    </div>
  );
};

export default CreatePlan;
