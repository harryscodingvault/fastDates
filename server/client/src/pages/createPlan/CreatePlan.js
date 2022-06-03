import React, { useState, useEffect } from "react";
import FormInput from "../../components/formInput/FormInput";
import "./CreatePlan.css";

const initialState = {
  title: "",
  duration: "",
  location: "",
  destination_1: "",
  destination_2: "",
  destination_3: "",
  destination_4: "",
  destination_5: "",
};

const CreatePlan = () => {
  const [values, setValues] = useState(initialState);
  const [nDestinations, setNDestinations] = useState(1);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    const {
      title,
      duration,
      location,
      destination_1,
      destination_2,
      destination_3,
      destination_4,
      destination_5,
    } = values;
    const destinations = [
      destination_1,
      destination_2,
      destination_3,
      destination_4,
      destination_5,
    ];
    const filteredD = destinations.filter((item) => {
      return item !== "";
    });
    console.log("destinations", filteredD);
    e.preventDefault();
    console.log({ title, location, duration, destinations: filteredD });
  };

  const renderDestinationsInputs = () => {
    let destinationsList = [];
    for (let i = 1; i <= nDestinations; i++) {
      destinationsList.push(
        <FormInput
          key={i}
          type="text"
          name={`destination_${i}`}
          value={values[`destination_${i}`]}
          handleChange={handleChange}
          placeholder="Destination"
        />
      );
    }
    return destinationsList;
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
          type="text"
          name="location"
          value={values.location}
          handleChange={handleChange}
          placeholder="Location"
        />
        <div className="create-plan-destinations-group">
          {renderDestinationsInputs()}
        </div>

        {nDestinations !== 5 && (
          <div
            className="btn-add"
            onClick={() => setNDestinations(nDestinations + 1)}
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
