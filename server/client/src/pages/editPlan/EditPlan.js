import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/formInput/FormInput";
import "./EditPlan.css";
import { GoDiffAdded, GoDiffRemoved } from "react-icons/go";

import { editPlan } from "../../features/plans/planSlice";

const EditPlan = () => {
  const { error_message, isLoading, currentPlan, durationOptions } =
    useSelector((store) => store.plan);
  const [values, setValues] = useState({
    title: currentPlan.plan_title,
    duration: currentPlan.plan_duration,
    location: currentPlan.plan_location,
    address: currentPlan.plan_address,
  });

  const formatArray = currentPlan.destinations.map((item) => {
    const destination = {
      name: item.destination_name,
      type: item.destination_type,
      id: item.destination_id,
    };
    return destination;
  });

  const [destinations, setDestinations] = useState(formatArray);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    Object.keys(currentPlan).length === 0 && navigate("/");
  }, [currentPlan, navigate]);

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
        address,
        duration,
        destinations: filteredD,
      };

      dispatch(editPlan({ data: plan }));

      if (!error_message.message && currentPlan) {
        navigate("/");
      }
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
          values={destinations[index].name || ""}
          handleChange={(e) => arrayHandler(e)}
          placeholder="Destination Name"
        />

        <FormInput
          type="text"
          name="type"
          values={destinations[index].type || ""}
          handleChange={(e) => arrayHandler(e)}
          placeholder="Destination Type"
        />
      </div>
    );
  });

  return (
    <div className="create-plan-container">
      <form className="form" onSubmit={onSubmit}>
        <h3>Edit Plan</h3>

        <FormInput
          type="text"
          name="title"
          values={values.title}
          handleChange={handleChange}
          placeholder="Title"
        />
        <div className="form-row form-row-select">
          <select
            name="duration"
            id="duration"
            value={values.duration}
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
          values={values.location}
          handleChange={handleChange}
          placeholder="Location"
        />
        <FormInput
          type="text"
          name="address"
          values={values.address}
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
          <div className="edit-btn-group">
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

export default EditPlan;
