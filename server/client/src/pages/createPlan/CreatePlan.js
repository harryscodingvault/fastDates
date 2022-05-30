import React, { useState, useEffect } from "react";
import FormInput from "../../components/formInput/FormInput";
import "./CreatePlan.css";

const initialState = {
  title: "",
  duration: "",
  travel_time: "",
  location: { city: "", state: "" },
  destinations: [{ address: "" }],
};

const CreatePlan = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

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
          type="number"
          name="travel_time"
          value={values.travel_time}
          handleChange={handleChange}
          placeholder="Travel Time"
        />
        <FormInput
          type="text"
          name="city"
          value={values.location.city}
          handleChange={handleChange}
          placeholder="City"
        />
        <FormInput
          type="text"
          name="state"
          value={values.location.state}
          handleChange={handleChange}
          placeholder="State"
        />
        <FormInput
          type="text"
          name="destination"
          value={values.destinations[0].address}
          handleChange={handleChange}
          placeholder="Destination"
        />

        <button className="btn btn-block" type="submit">
          <h5>Submit</h5>
        </button>
      </form>
    </div>
  );
};

export default CreatePlan;
